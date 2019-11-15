import React from 'react';

import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events from 'parser/core/Events';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';
import Statistic from 'interface/statistics/Statistic';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';
import { TooltipElement } from 'common/Tooltip';
import EnemyInstances from 'parser/shared/modules/EnemyInstances';
import { SHATTER_DEBUFFS } from '../../constants';

class GlacialSpikeNoIL extends Analyzer {
  static dependencies = {
    enemies: EnemyInstances,
  };

  lastCastEvent = null;
  lastCastDidDamage = false;
  goodCasts = 0;
  totalCasts = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.GLACIAL_SPIKE_TALENT.id) && this.owner.build === 'noil';
    this.hasIncantersFlow = this.selectedCombatant.hasTalent(SPELLS.INCANTERS_FLOW_TALENT.id);
    this.hasSplittingIce = this.selectedCombatant.hasTalent(SPELLS.SPLITTING_ICE_TALENT.id);

    this.addEventListener(Events.cast.by(SELECTED_PLAYER).spell(SPELLS.GLACIAL_SPIKE_TALENT), this.onGlacialCast);
    this.addEventListener(Events.damage.by(SELECTED_PLAYER).spell(SPELLS.GLACIAL_SPIKE_DAMAGE), this.onGlacialDamage);
    this.addEventListener(Events.fightend, this.onFightEnd);
  }

  onGlacialDamage(event) {
    if (this.lastCastEvent === null) {
      return;
    }

    this.lastCastDidDamage = true;

    // Check if the target had a shatter effect on them
    const enemy = this.enemies.getEntity(event);
    if (enemy && SHATTER_DEBUFFS.some(effect => enemy.hasBuff(effect, event.timestamp))) {
      this.goodCasts += 1;
      this.lastCastEvent = null;
    }
  }

  onGlacialCast(event) {
    this.invalidateCast();
    this.totalCasts += 1;
    this.lastCastEvent = event;
    this.lastCastDidDamage = false;
  }

  onFightEnd() {
    this.invalidateCast();
  }

  invalidateCast() {
    if (this.lastCastEvent === null) {
      // Cast was good!
      return;
    }

    this.lastCastEvent.meta = this.lastCastEvent.meta || {};
    this.lastCastEvent.meta.isInefficientCast = true;
    if (this.lastCastDidDamage) {
      this.lastCastEvent.meta.inefficientCastReason = `You cast Glacial Spike without shattering it. You should wait until you are able to use a Brain Freeze proc${this.hasIncantersFlow ? ' or cast it so it hits the target while you have 5 stacks of Incanter\'s Flow' : ''} to maximize its damage.`;
    } else {
      this.lastCastEvent.meta.inefficientCastReason = 'The target died before Glacial Spike hit it. You should avoid this by casting faster spells on very low-health targets, it is important to not waste potential Glacial Spike damage.';

    }
    this.lastCastEvent = null;
  }

  get utilPercentage() {
    return (this.goodCasts / this.totalCasts) || 0;
  }

  get badCasts() {
    return this.totalCasts - this.goodCasts;
  }

  get utilSuggestionThresholds() {
    return {
      actual: this.utilPercentage,
      isLessThan: {
        minor: 1.0,
        average: 0.85,
        major: 0.7,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    when(this.utilSuggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(
          <>
            You cast <SpellLink id={SPELLS.GLACIAL_SPIKE_TALENT.id} /> inefficiently {this.badCasts} times. Because it is such a potent ability, it is important to maximize its damage by only casting it when at least one of the following is true:
            <ul>
              <li>
                You have a <SpellLink id={SPELLS.BRAIN_FREEZE.id} /> proc to &nbsp;
                <TooltipElement
                  content={(
                    <>
                      <em>Glacial Spike > (empowered) Flurry > Ice Lance</em><br />
                      Because of Flurry's extremely fast travel time, using a Brain Freeze proc immediately following a slower spell like Glacial Spike will apply Winter's Chill to the target before the slower spell hits.
                    </>
                  )}
                >
                  use on it
                </TooltipElement>.
              </li>
              <li>The <SpellLink id={SPELLS.GLACIAL_SPIKE_TALENT.id} /> will hit the target while you have 5 stacks of <SpellLink id={SPELLS.INCANTERS_FLOW_TALENT.id} /> (if talented).</li>
            </ul>
          </>)
          .icon(SPELLS.GLACIAL_SPIKE_TALENT.icon)
          .actual(`${formatPercentage(this.utilPercentage, 1)}% utilization`)
          .recommended(`${formatPercentage(recommended, 1)}% is recommended`);
      });
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.CORE(30)}
        size="flexible"
        tooltip={(
          <>
            You cast Glacial Spike {this.totalCasts} times, {this.goodCasts} casts of which met at least one of the requirements:
            <ul>
              <li>It was shattered via Brain Freeze (or some other freeze effect).</li>
              <li>It will hit the target while you have 5 stacks of Incanter's Flow.</li>
            </ul>
          </>
        )}
      >
        <BoringSpellValueText spell={SPELLS.GLACIAL_SPIKE_TALENT}>
        {`${formatPercentage(this.utilPercentage, 0)}%`} <small>Cast utilization</small>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default GlacialSpikeNoIL;
