import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import COVENANTS from 'game/shadowlands/COVENANTS';
import Mastery from '../../core/Mastery';
import SPELLS from 'common/SPELLS';
import Statistic from 'parser/ui/Statistic';
import { formatDuration, formatMilliseconds, formatNumber, formatPercentage } from 'common/format';
import BoringValue from 'parser/ui/BoringValueText';
import { SpellIcon } from 'interface';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import React from 'react';
import Events, { HealEvent } from 'parser/core/Events';
import Combatants from 'parser/shared/modules/Combatants';
import { getSpellInfo } from '../../../SpellInfo';
import calculateEffectiveHealing from 'parser/core/calculateEffectiveHealing';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';
import Enemies from 'parser/shared/modules/Enemies';

const PERIODIC_BOOST = 0.25; // the amount Adaptive Swarm boosts periodic effects

// TODO move to core?
/**
 * -- Adaptive Swarm --
 * Covenant Ability - Necrolord
 *
 * Command a swarm that heals (157.5% of Spell power) or deals (150% of Spell power) Shadow damage
 * over 12 sec to a target, and increases the effectiveness of your periodic effects on them by 25%.
 * Upon expiration, jumps to a target within 25 yards, alternating between friend and foe up to 3 times.
 */
class AdaptiveSwarm extends Analyzer {
  static dependencies = {
    abilityTracker: AbilityTracker,
    combatants: Combatants,
    enemies: Enemies,
    mastery: Mastery,
  };

  protected abilityTracker!: AbilityTracker;
  protected combatants!: Combatants;
  protected enemies!: Enemies;
  protected mastery!: Mastery;

  // a tally of the healing attributable to Adaptive Swarm's boost on periodic effects
  // while it does buff itself, we don't count that because it's already covered by the 'direct healing' category
  _periodicBoostAttribution: number = 0;

  constructor(options: Options) {
    super(options);

    this.active = this.selectedCombatant.hasCovenant(COVENANTS.NECROLORD.id);

    this.addEventListener(Events.heal.by(SELECTED_PLAYER), this.onHeal);
  }

  onHeal(event: HealEvent) {
    const target = this.combatants.getEntity(event);
    if (
      target === null ||
      !target.hasBuff(
        SPELLS.ADAPTIVE_SWARM_HEAL.id,
        this.owner.currentTimestamp,
        0,
        0,
        this.selectedCombatant.id,
      )
    ) {
      return;
    }

    // if we got this far, our adaptive swarm is on the heal target
    const spellId = event.ability.guid;
    if (
      spellId !== SPELLS.ADAPTIVE_SWARM_HEAL.id && // don't double count
      getSpellInfo(spellId).masteryStack // TODO is this a reasonable proxy for 'periodic heals' ?
    ) {
      this._periodicBoostAttribution += calculateEffectiveHealing(event, PERIODIC_BOOST);
    }
  }

  get directPercent() {
    return this.owner.getPercentageOfTotalHealingDone(
      this.mastery.getDirectHealing(SPELLS.ADAPTIVE_SWARM_HEAL.id),
    );
  }

  get masteryPercent() {
    return this.owner.getPercentageOfTotalHealingDone(
      this.mastery.getMasteryHealing(SPELLS.ADAPTIVE_SWARM_HEAL.id),
    );
  }

  get periodicBoostPercent() {
    return this.owner.getPercentageOfTotalHealingDone(this._periodicBoostAttribution);
  }

  get totalPercent() {
    return this.directPercent + this.masteryPercent + this.periodicBoostPercent;
  }

  get casts() {
    return this.abilityTracker.getAbility(SPELLS.ADAPTIVE_SWARM.id).casts;
  }

  get buffUptime() {
    return this.combatants.getBuffUptime(SPELLS.ADAPTIVE_SWARM_HEAL.id);
  }

  get buffTimePerCast() {
    return this.buffUptime / this.casts; // TODO check casts = 0
  }

  get debuffUptime() {
    return this.enemies.getBuffUptime(SPELLS.ADAPTIVE_SWARM_DAMAGE.id);
  }

  get debuffTimePerCast() {
    return this.debuffUptime / this.casts; // TODO check casts = 0
  }

  get damagePerSecond() {
    return this.abilityTracker.getAbility(SPELLS.ADAPTIVE_SWARM_DAMAGE.id).damageEffective / this.owner.fightDuration * 1000; // TODO easier way to get DPS?
  }

  // TODO suggestion thresholds once I know what's reasonable - or don't bother because Adaptive Swarm isn't recommended anyway?

  // TODO bounce counter?

  // TODO incorporate the damage into this stats?
  statistic() {
    return (
      <Statistic
        size="flexible"
        position={STATISTIC_ORDER.OPTIONAL(20)}
        tooltip={
          <>
            This is the sum of the direct healing from Adaptive Swarm, the healing enabled by its
            extra mastery stack, and the healing enabled by its boost to periodic effects. It had
            an average healing uptime per cast of <strong>{(this.buffTimePerCast / 1000).toFixed(0)}s</strong>.
            <ul>
              <li>
                Direct: <strong>{formatPercentage(this.directPercent)}%</strong>
              </li>
              <li>
                Mastery: <strong>{formatPercentage(this.masteryPercent)}%</strong>
              </li>
              <li>
                Boost: <strong>{formatPercentage(this.periodicBoostPercent)}%</strong>
              </li>
            </ul>
            In addition, Adaptive Swarm did <strong>{formatNumber(this.damagePerSecond)}</strong> DPS over the encounter with an
            average damage uptime per cast of <strong>{(this.debuffTimePerCast / 1000).toFixed(0)}s</strong>.
          </>
        }
      >
        <BoringValue
          label={
            <>
              <SpellIcon id={SPELLS.ADAPTIVE_SWARM.id} /> Adaptive Swarm healing
            </>
          }
        >
          <>{formatPercentage(this.totalPercent)} %</>
        </BoringValue>
      </Statistic>
    );
  }
}

export default AdaptiveSwarm;
