import { AnyEvent, BeginChannelEvent, EventType, GlobalCooldownEvent } from 'parser/core/Events';
import metric, { Info } from 'parser/core/metric';
import { ClosedTimePeriod, duration, intersection, union } from 'parser/core/timePeriods';

/**
 * Effectively a distilled representation of a CastEvent
 * with only the spellId and the timestamp.
 */
export type SpellCast = {
  /** The ID of the spell being cast */
  spellId: number;
  /** The time the spell cast completed. */
  castTimestamp: number;
};

/**
 * A spell cast that has a GCD and/or cast time.
 * The time period represents when the player was either inside the GCD from the cast
 * or actively channeling the spell.
 *
 * castTimestamp will typically be the start time of the period for instants and the end time
 * of the period for cast time spells, although it could be in the middle for a cast time spell
 * that's faster than the GCD.
 *
 */
export type SpellTimePeriod = ClosedTimePeriod & SpellCast;

/**
 * Time periods when the player was active over the course of an encounter, either channeling
 * or in a GCD. These time periods are separated by ability and are possibly overlapping.
 * Note that 'channeling' here refers to anything with a cast time.
 * Depends on the fabricated beginchannel, endchannel, and globalcooldown events.
 */
export const spellActiveTimePeriods = metric(
  (events: AnyEvent[], info: Info): SpellTimePeriod[] => {
    /*
     * Approach:
     *
     * Instant cast spells are 'active' for the duration of the GCD, which we add on those events.
     *
     * Completed channels can be calculated using the endchannel event, which links back to the
     * matching beginchannel. In rare cases, the GCD for a channel could be longer than the channel,
     * so we save previous GCD to doublecheck that.
     *
     * Cancelled channels don't show when they were cancelled, so we just treat them as a GCD,
     * handled again via the GCD event.
     *
     * A final special case is a channel that is started, but then the encounter ends before
     * it finishes - we handle this at the end.
     */
    let uncoveredUncancelledBeginChannel: BeginChannelEvent | null = null;
    let lastCastTimeGcd: GlobalCooldownEvent | null = null;
    const results: SpellTimePeriod[] = events.reduce((acc: SpellTimePeriod[], event) => {
      if (event.type === EventType.BeginChannel && !event.isCancelled) {
        uncoveredUncancelledBeginChannel = event;
      } else if (event.type === EventType.EndChannel) {
        let end = event.timestamp;
        if (lastCastTimeGcd && lastCastTimeGcd.trigger === event.beginChannel) {
          end = Math.max(end, lastCastTimeGcd.timestamp + lastCastTimeGcd.duration);
        }
        acc.push({
          start: event.beginChannel.timestamp,
          end,
          spellId: event.ability.guid,
          castTimestamp: event.timestamp,
        });
        uncoveredUncancelledBeginChannel = null;
        lastCastTimeGcd = null;
      } else if (event.type === EventType.GlobalCooldown) {
        if (event.trigger.type === EventType.Cast || event.trigger.isCancelled) {
          // this is an instant on the GCD or a cancelled channel
          acc.push({
            start: event.timestamp,
            end: event.timestamp + event.duration,
            spellId: event.ability.guid,
            castTimestamp: event.timestamp,
          });
        } else {
          // this is the GCD overlapping an actual cast - either could be longer
          lastCastTimeGcd = event;
        }
      }
      return acc;
    }, []);

    // handle special case of channel in progress when encounter ends
    if (uncoveredUncancelledBeginChannel !== null) {
      // typecast needed because typecheck doesn't 'see' the assignments inside the reduce
      results.push({
        start: (uncoveredUncancelledBeginChannel as BeginChannelEvent).timestamp,
        end: info.fightEnd,
        spellId: (uncoveredUncancelledBeginChannel as BeginChannelEvent).ability.guid,
        castTimestamp: (uncoveredUncancelledBeginChannel as BeginChannelEvent).timestamp,
      });
    }

    return results;
  },
);

/** The (non-overlapping) time periods the player was active during the encounter */
export const activeTimePeriods = metric((events: AnyEvent[], info: Info): ClosedTimePeriod[] =>
  union(spellActiveTimePeriods(events, info), {
    start: info.fightStart,
    end: info.fightEnd,
  }),
);

/** The percentage of time the player was active during the encounter */
export const activeTimePercent = metric((events: AnyEvent[], info: Info): number => {
  const { fightStart, fightEnd } = info;
  return duration(activeTimePeriods(events, info)) / (fightEnd - fightStart);
});

/** The (possibly overlapping) time periods of player spell casting during a given subset of the encounter */
export const spellActiveTimePeriodSubset = (
  events: AnyEvent[],
  info: Info,
  subset: ClosedTimePeriod,
): SpellTimePeriod[] =>
  spellActiveTimePeriods(events, info)
    .map((t) => intersection(t, subset))
    .filter((t): t is SpellTimePeriod => t !== null);

/** The (non-overlapping) time periods the player was active during a given subset of the encounter */
export const activeTimePeriodSubset = (
  events: AnyEvent[],
  info: Info,
  subset: ClosedTimePeriod,
): ClosedTimePeriod[] =>
  activeTimePeriods(events, info)
    .map((t) => intersection(t, subset))
    .filter((t): t is ClosedTimePeriod => t !== null);

export const activeTimeSubsetPercent = (
  events: AnyEvent[],
  info: Info,
  subset: ClosedTimePeriod,
): number => duration(activeTimePeriodSubset(events, info, subset)) / (subset.end - subset.start);
