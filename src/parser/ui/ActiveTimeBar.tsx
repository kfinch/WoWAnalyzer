import './ActiveTimeBar.scss';
import { SpellIcon } from 'interface';
import { AnyEvent } from 'parser/core/Events';
import { Info } from 'parser/core/metric';
import { ClosedTimePeriod } from 'parser/core/timePeriods';
import { spellActiveTimePeriodSubset, SpellTimePeriod } from 'parser/shared/metrics/activeTime';

type Props = {
  /** All events (should be available in functional react component's props) */
  events: AnyEvent[];
  /** The fight info (should be available in functional react component's props) */
  info: Info;
  /** The time period to highlight on this bar */
  window: ClosedTimePeriod;
  /** Iff true, spells that don't finish in the time period will be deemphasized */
  onlySpellsFinishingWithinWindow?: boolean; // TODO impl
  /** Time to show before the window, in milliseconds */
  startBuffer?: number; // TODO impl
  /** Time to show after the window, in milliseconds */
  endBuffer?: number; // TODO impl
};

export function ActiveTimeBar({
  events,
  info,
  window,
  onlySpellsFinishingWithinWindow,
  ...others
}: Props): JSX.Element {
  const spellPeriods: SpellTimePeriod[] = spellActiveTimePeriodSubset(events, info, window);
  return (
    <div className="active-time-bar" {...others}>
      {spellPeriods.map((spellPeriod, ix) => (
        <ActiveTimeBarSegment spellPeriod={spellPeriod} window={window} key={ix} />
      ))}
    </div>
  );
}

function ActiveTimeBarSegment({
  spellPeriod,
  window,
}: {
  spellPeriod: SpellTimePeriod;
  window: ClosedTimePeriod;
}): JSX.Element {
  const windowDuration = window.end - window.start;
  const left = `${((spellPeriod.start - window.start) / windowDuration) * 100}%`;
  const width = `${((spellPeriod.end - spellPeriod.start) / windowDuration) * 100}%`;

  return (
    <div className="spell-period" style={{ left, width }}>
      <SpellIcon noLink id={spellPeriod.spellId} />
    </div>
  );
}
