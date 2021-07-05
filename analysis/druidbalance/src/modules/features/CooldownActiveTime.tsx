import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, {
  AnyEvent,
  ApplyBuffEvent,
  FightEndEvent,
  RemoveBuffEvent,
} from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import FilteredActiveTime from 'parser/shared/modules/FilteredActiveTime';
import React from 'react';

const COOLDOWN_BUFFS = [
  SPELLS.CELESTIAL_ALIGNMENT,
  SPELLS.INCARNATION_CHOSEN_OF_ELUNE_TALENT,
  SPELLS.RAVENOUS_FRENZY,
];

const MINOR_DOWNTIME_THRESHOLD = 0.03;
const AVERAGE_DOWNTIME_THRESHOLD = 0.06;
const MAJOR_DOWNTIME_THRESHOLD = 0.1;

const DEBUG = true;

/**
 * Like 'AlwaysBeCasting', but specifically checks during major throughput cooldowns.
 * TODO generalize this for use by other specs (changing only Cooldown Buffs specification)
 */
class CooldownActiveTime extends Analyzer {
  static dependencies = {
    filteredActiveTime: FilteredActiveTime,
  };
  protected filteredActiveTime!: FilteredActiveTime;

  /** the number of tracked buffs that are currently active */
  activeCds: number = 0;
  /** completed periods when at least one tracked buff is active */
  cdPeriods: Array<{ start: number; end: number }> = [];
  /** start time of the last cooldown, or undefined if we're not currently in a cooldown */
  lastCdStart?: number = undefined;

  /** Total time spent in cooldowns (tallied only when a CD or the encounter ends) */
  cooldownTotalTime: number = 0;
  /** Active time in cooldowns (tallied only when a CD or the encounter ends) */
  cooldownActiveTime: number = 0;

  constructor(options: Options) {
    super(options);

    this.addEventListener(
      Events.applybuff.by(SELECTED_PLAYER).spell(COOLDOWN_BUFFS),
      this.onApplyCdBuff,
    );
    this.addEventListener(
      Events.removebuff.by(SELECTED_PLAYER).spell(COOLDOWN_BUFFS),
      this.onRemoveCdBuff,
    );
    this.addEventListener(Events.fightend, this.onFightEnd);
  }

  onApplyCdBuff(event: ApplyBuffEvent) {
    if (this.activeCds === 0) {
      this.lastCdStart = event.timestamp;
    }
    this.activeCds += 1;
  }

  onRemoveCdBuff(event: RemoveBuffEvent) {
    if (this.activeCds === 1) {
      this._tallyCd(event);
    }
    this.activeCds -= 1;
  }

  onFightEnd(event: FightEndEvent) {
    if (this.activeCds > 0) {
      this._tallyCd(event);
    }
  }

  /** Tallies the now concluded CD period */
  _tallyCd(event: AnyEvent) {
    if (this.lastCdStart === undefined) {
      return; // should always be defined here, but just in case...
    }
    const start = this.lastCdStart;
    const end = event.timestamp;
    const cdTime = end - start;
    const cdActiveTime = this.filteredActiveTime.getActiveTime(start, end);
    DEBUG &&
      console.log(`CD @ ${this.owner.formatTimestamp(start)} - ${this.owner.formatTimestamp(
        end,
      )}${' '}
      | duration=${cdTime} active=${cdActiveTime}`);

    this.cooldownTotalTime += cdTime;
    this.cooldownActiveTime += cdActiveTime;

    this.cdPeriods.push({ start, end });
    this.lastCdStart = undefined;
  }

  get percentCooldownActiveTime(): number {
    return this.cooldownActiveTime / this.cooldownTotalTime || 0;
  }

  get percentCooldownDowntime(): number {
    return 1 - this.percentCooldownActiveTime;
  }

  get cooldownActiveTimeThresholds() {
    return {
      actual: this.percentCooldownActiveTime,
      isLessThan: {
        minor: 1 - MINOR_DOWNTIME_THRESHOLD,
        average: 1 - AVERAGE_DOWNTIME_THRESHOLD,
        major: 1 - MAJOR_DOWNTIME_THRESHOLD,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  get cooldownDowntimeThresholds() {
    return {
      actual: this.percentCooldownDowntime,
      isLessThan: {
        minor: MINOR_DOWNTIME_THRESHOLD,
        average: AVERAGE_DOWNTIME_THRESHOLD,
        major: MAJOR_DOWNTIME_THRESHOLD,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  suggestions(when: When) {
    when(this.cooldownDowntimeThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          You had downtime during your major DPS cooldowns. Continually casting during while your
          cooldowns are active is extremely important, and you should plan cooldown timings around
          fight mechanics when nescesary.
        </>,
      )
        .icon('spell_mage_altertime')
        .actual(`${formatPercentage(actual, 1)}% downtime during major cooldowns.`)
        .recommended(`none is recommended`),
    );
  }
}

export default CooldownActiveTime;
