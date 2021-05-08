import { t } from '@lingui/macro';
import { formatPercentage, formatNumber } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellLink } from 'interface';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import calculateEffectiveHealing from 'parser/core/calculateEffectiveHealing';
import Events, { HealEvent } from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import { Attribution } from 'parser/shared/modules/HotTracker';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemPercentHealingDone from 'parser/ui/ItemPercentHealingDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import React from 'react';

import { HOTS_INCREASED_RATE } from '../../constants';

import HotTrackerRestoDruid from '../core/hottracking/HotTrackerRestoDruid';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';

const debug = false;

const FLOURISH_EXTENSION = 8000;
const FLOURISH_HEALING_INCREASE = 1;

/**
 * **Flourish** - Talent lvl 50
 *
 * Extends the duration of all of your heal over time effects on friendly targets within 60 yards by 8 sec,
 * and increases the rate of your heal over time effects by 100% for 8 sec.
 */
// TODO: Idea - Give suggestions on low amount/duration extended with flourish on other HoTs
class Flourish extends Analyzer {
  static dependencies = {
    hotTracker: HotTrackerRestoDruid,
    abilityTracker: AbilityTracker,
  };

  hotTracker!: HotTrackerRestoDruid;
  abilityTracker!: AbilityTracker;

  extensionAttributions: Attribution[] = [];
  rateAttributions: number[] = [];
  flourishCount: number = 0;
  wgsExtended = 0; // tracks how many flourishes extended Wild Growth

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(SPELLS.FLOURISH_TALENT.id);
    this.addEventListener(
      Events.heal.by(SELECTED_PLAYER).spell(HOTS_INCREASED_RATE),
      this.onIncreasedRateHeal,
    );
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.FLOURISH_TALENT),
      this.onFlourishCast,
    );
  }

  get totalExtensionHealing() {
    return this.extensionAttributions.reduce((acc, flourish) => acc + flourish.healing, 0);
  }

  get totalRateHealing() {
    return this.rateAttributions.reduce((acc, flourish) => acc + flourish, 0);
  }

  get totalHealing() {
    return this.totalExtensionHealing + this.totalRateHealing;
  }

  get casts() {
    return this.flourishCount;
  }

  get healingPerCast() {
    return (this.casts === 0) ? 0 : this.totalHealing / this.casts;
  }

  get percentWgsExtended() {
    return (this.casts === 0) ? 0 : this.wgsExtended / this.casts;
  }

  get wildGrowthSuggestionThresholds() {
    return {
      actual: this.percentWgsExtended,
      isLessThan: {
        minor: 1.0,
        average: 0.75,
        major: 0.5,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  onIncreasedRateHeal(event: HealEvent) {
    const spellId = event.ability.guid;

    if (this.selectedCombatant.hasBuff(SPELLS.FLOURISH_TALENT.id) && event.tick) {
      this.rateAttributions[this.flourishCount-1] += calculateEffectiveHealing(event, FLOURISH_HEALING_INCREASE);
    }
  }

  onFlourishCast() {
    this.flourishCount += 1;
    this.rateAttributions.push(0);
    const newFlourish: Attribution = {
      attributionId: SPELLS.FLOURISH_TALENT.id,
      name: `Flourish #${this.flourishCount}`,
      healing: 0,
      procs: 0,
      totalExtension: 0,
    };
    this.extensionAttributions.push(newFlourish);

    let foundWg = false;

    Object.keys(this.hotTracker.hots).forEach((playerIdString) => {
      const playerId = Number(playerIdString);
      Object.keys(this.hotTracker.hots[playerId]).forEach((spellIdString) => {
        const spellId = Number(spellIdString);
        this.hotTracker.addExtension(newFlourish, FLOURISH_EXTENSION, playerId, spellId);

        if (spellId === SPELLS.WILD_GROWTH.id) {
          foundWg = true;
        }
      });
    });
    if (foundWg) {
      this.wgsExtended += 1;
    }
  }

  suggestions(when: When) {
    if (this.flourishCount === 0) {
      return;
    }

    when(this.wildGrowthSuggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          Your <SpellLink id={SPELLS.FLOURISH_TALENT.id} /> should always aim to extend a{' '}
          <SpellLink id={SPELLS.WILD_GROWTH.id} />
        </>,
      )
        .icon(SPELLS.FLOURISH_TALENT.icon)
        .actual(
          t({
            id: 'druid.restoration.suggestions.flourish.wildGrowthExtended',
            message: `${formatPercentage(this.wgsExtended / this.flourishCount, 0)}% WGs extended.`,
          }),
        )
        .recommended(`${formatPercentage(recommended)}% is recommended`),
    );
  }

  statistic() {
    return (
      <Statistic
        size="flexible"
        position={STATISTIC_ORDER.OPTIONAL(15)}
        tooltip={
          <>
            This is the sum of the healing enabled by the HoT extension and the HoT rate increase.
            Due to limitations in the way we do healing attribution, there may be some double-counting
            between the Extension and Increased Rate values, meaning the true amount attributable will
            be slightly lower than listed.
            <ul>
              <li>
                Extension: <strong>{this.owner.formatItemHealingDone(this.totalExtensionHealing)}</strong>
              </li>
              <li>
                Increased Rate: <strong>{this.owner.formatItemHealingDone(this.totalRateHealing)}</strong>
              </li>
              <li>
                Wild Growths Casts Extended: <strong>{this.wgsExtended} / {this.flourishCount}</strong>
              </li>
              <li>
                Average Healing per Cast: <strong>{formatNumber(this.healingPerCast)}</strong>
              </li>
            </ul>
            <br />
            For the included table, note that extension healing for a flourish cast near the end of
            a fight might have lower than expected numbers because extension healing isn't tallied
            until the HoT has ticked past its original duration.
          </>
        }
        dropdown={
          <>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Cast</th>
                  <th>HoTs Extended</th>
                  <th>Extension Healing</th>
                  <th>Rate Healing</th>
                </tr>
              </thead>
              <tbody>
                {this.extensionAttributions.map((flourish, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{flourish.procs}</td>
                    <td>{formatNumber(flourish.healing)}</td>
                    <td>{formatNumber(this.rateAttributions[index])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      >
        <BoringSpellValueText spell={SPELLS.FLOURISH_TALENT}>
          <ItemPercentHealingDone approximate amount={this.totalHealing} />
          <br />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default Flourish;
