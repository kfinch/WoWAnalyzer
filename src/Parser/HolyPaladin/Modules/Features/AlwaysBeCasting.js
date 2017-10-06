import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import { formatPercentage } from 'common/format';

import CoreAlwaysBeCastingHealing from 'Parser/Core/Modules/AlwaysBeCastingHealing';

const debug = true;

const HEALING_ABILITIES_ON_GCD = [
  SPELLS.FLASH_OF_LIGHT.id,
  SPELLS.HOLY_LIGHT.id,
  SPELLS.HOLY_SHOCK_CAST.id,
  // ABILITIES.JUDGMENT_CAST.id, // Only with either JoL or Ilterendi
  SPELLS.LIGHT_OF_DAWN_CAST.id,
  SPELLS.LIGHT_OF_THE_MARTYR.id,
  SPELLS.BESTOW_FAITH_TALENT.id,
  SPELLS.TYRS_DELIVERANCE_CAST.id,
  SPELLS.HOLY_PRISM_TALENT.id,
  SPELLS.LIGHTS_HAMMER_TALENT.id,
  // ABILITIES.CRUSADER_STRIKE.id, // Only with Crusader's Might, is added in on_byPlayer_combatantinfo if applicable
];

class AlwaysBeCasting extends CoreAlwaysBeCastingHealing {
  static HEALING_ABILITIES_ON_GCD = HEALING_ABILITIES_ON_GCD;
  static ABILITIES_ON_GCD = [
    ...HEALING_ABILITIES_ON_GCD,
    SPELLS.JUDGMENT_CAST.id,
    SPELLS.CRUSADER_STRIKE.id,
    225141, // http://www.wowhead.com/spell=225141/fel-crazed-rage (Draught of Souls)
    SPELLS.DIVINE_STEED.id,
    26573, // Consecration
    SPELLS.BLINDING_LIGHT_TALENT.id,
    642, // Divine Shield
    SPELLS.LAY_ON_HANDS.id,
    SPELLS.BEACON_OF_FAITH_TALENT.id,
    SPELLS.BEACON_OF_THE_LIGHTBRINGER_TALENT.id, // pretty sure this will be the logged cast when BotLB is reapplied, not the below "Beacon of Light" which is the buff. Not yet tested so leaving both in.
    53563, // Beacon of Light
    SPELLS.BEACON_OF_VIRTUE_TALENT.id,
    SPELLS.BLESSING_OF_FREEDOM.id,
    1022, // Blessing of Protection
    4987, // Cleanse
    853, // Hammer of Justice
    SPELLS.HAND_OF_RECKONING.id,
  ];

  on_initialized() {
    const combatant = this.combatants.selected;

    if (combatant.hasTalent(SPELLS.CRUSADERS_MIGHT_TALENT.id)) {
      this.constructor.HEALING_ABILITIES_ON_GCD.push(SPELLS.CRUSADER_STRIKE.id);
    }
    if (combatant.hasTalent(SPELLS.JUDGMENT_OF_LIGHT_TALENT.id) || combatant.hasFinger(ITEMS.ILTERENDI_CROWN_JEWEL_OF_SILVERMOON.id)) {
      this.constructor.HEALING_ABILITIES_ON_GCD.push(SPELLS.JUDGMENT_CAST.id);
    }
  }

  recordCastTime(
    castStartTimestamp,
    globalCooldown,
    begincast,
    cast,
    spellId
  ) {
    super.recordCastTime(
      castStartTimestamp,
      globalCooldown,
      begincast,
      cast,
      spellId
    );
    this._verifyChannel(SPELLS.FLASH_OF_LIGHT.id, 1500, begincast, cast);
    // Can't really verify Holy Light as it can get a reduced CD from Infusion of Light
  }

  countsAsHealingAbility(cast) {
    const spellId = cast.ability.guid;
    if (spellId === SPELLS.HOLY_SHOCK_CAST.id && !cast.targetIsFriendly) {
      debug && console.log(`%cABC: ${cast.ability.name} (${spellId}) skipped for healing time; target is not friendly`, 'color: orange');
      return false;
    }
    return super.countsAsHealingAbility(cast);
  }

  suggestions(when) {
    const nonHealingTimePercentage = this.totalHealingTimeWasted / this.owner.fightDuration;
    const deadTimePercentage = this.totalTimeWasted / this.owner.fightDuration;

    when(nonHealingTimePercentage).isGreaterThan(0.3)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest('Your non healing time can be improved. Try to reduce the delay between casting spells and try to continue healing when you have to move.')
          .icon('petbattle_health-down')
          .actual(`${formatPercentage(actual)}% non healing time`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(recommended + 0.1).major(recommended + 0.15);
      });
    when(deadTimePercentage).isGreaterThan(0.2)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest('Your dead GCD time can be improved. Try to Always Be Casting (ABC); try to reduce the delay between casting spells and when you\'re not healing try to contribute some damage.')
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% dead GCD time`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(recommended + 0.15).major(1);
      });
  }

  showStatistic = true;
}

export default AlwaysBeCasting;
