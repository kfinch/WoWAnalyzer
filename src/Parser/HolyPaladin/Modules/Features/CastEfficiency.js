import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';

import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';

// eslint-disable no-unused-vars

class CastEfficiency extends CoreCastEfficiency {
  static CPM_ABILITIES = [
    ...CoreCastEfficiency.CPM_ABILITIES,
    {
      spell: SPELLS.HOLY_SHOCK_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 9 / (1 + haste),
      extraSuggestion: 'Casting Holy Shock regularly is very important for performing well.',
    },
    {
      spell: SPELLS.LIGHT_OF_DAWN_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      // Item - Paladin T20 Holy 2P Bonus: Reduces the cooldown of Light of Dawn by 2.0 sec.
      getCooldown: (haste, combatant) => (12 - (combatant.hasBuff(SPELLS.HOLY_PALADIN_T20_2SET_BONUS_BUFF.id) ? 2 : 0)) / (1 + haste),
      getOverhealing: (_, getAbility) => {
        const { healingEffective, healingAbsorbed, healingOverheal } = getAbility(SPELLS.LIGHT_OF_DAWN_HEAL.id);
        return healingOverheal / (healingEffective + healingAbsorbed + healingOverheal);
      },
      extraSuggestion: 'Casting Light of Dawn regularly is very important for performing well.',
    },
    {
      spell: SPELLS.JUDGMENT_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 12 / (1 + haste),
      isActive: combatant => combatant.hasTalent(SPELLS.JUDGMENT_OF_LIGHT_TALENT.id),
      recommendedCastEfficiency: 0.85, // this rarely overheals, so keeping this on cooldown is pretty much always best
      getOverhealing: (_, getAbility) => {
        const { healingEffective, healingAbsorbed, healingOverheal } = getAbility(SPELLS.JUDGMENT_OF_LIGHT_HEAL.id);
        return healingOverheal / (healingEffective + healingAbsorbed + healingOverheal);
      },
      extraSuggestion: <span>You should cast it whenever <SpellLink id={SPELLS.JUDGMENT_OF_LIGHT_TALENT.id} /> has dropped, which is usually on cooldown without delay. Alternatively you can ignore the debuff and just cast it whenever Judgment is available; there's nothing wrong with ignoring unimportant things to focus on important things.</span>,
    },
    {
      spell: SPELLS.BESTOW_FAITH_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 12,
      isActive: combatant => combatant.hasTalent(SPELLS.BESTOW_FAITH_TALENT.id),
      recommendedCastEfficiency: 0.7,
      extraSuggestion: <span>If you can't or don't want to cast it more consider using <SpellLink id={SPELLS.LIGHTS_HAMMER_TALENT.id} /> or <SpellLink id={SPELLS.CRUSADERS_MIGHT_TALENT.id} /> instead.</span>,
    },
    {
      spell: SPELLS.LIGHTS_HAMMER_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 60,
      isActive: combatant => combatant.hasTalent(SPELLS.LIGHTS_HAMMER_TALENT.id),
      getOverhealing: (_, getAbility) => {
        const { healingEffective, healingAbsorbed, healingOverheal } = getAbility(SPELLS.LIGHTS_HAMMER_HEAL.id);
        return healingOverheal / (healingEffective + healingAbsorbed + healingOverheal);
      },
    },
    {
      spell: SPELLS.BEACON_OF_VIRTUE_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 15,
      isActive: combatant => combatant.hasTalent(SPELLS.BEACON_OF_VIRTUE_TALENT.id),
      getOverhealing: (_, getAbility) => {
        const { healingEffective, healingAbsorbed, healingOverheal } = getAbility(SPELLS.BEACON_OF_VIRTUE_TALENT.id);
        return healingOverheal / (healingEffective + healingAbsorbed + healingOverheal);
      },
    },
    {
      spell: SPELLS.CRUSADER_STRIKE,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 4.5 / (1 + haste),
      charges: 2,
      isActive: combatant => combatant.hasTalent(SPELLS.CRUSADERS_MIGHT_TALENT.id),
      recommendedCastEfficiency: 0.60,
      extraSuggestion: <span>When you are using <SpellLink id={SPELLS.CRUSADERS_MIGHT_TALENT.id} /> it is important to use <SpellLink id={SPELLS.CRUSADER_STRIKE.id} /> often enough to benefit from the talent. Use a different talent if you are unable to.</span>,
    },
    {
      spell: SPELLS.HOLY_PRISM_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 20,
      isActive: combatant => combatant.hasTalent(SPELLS.HOLY_PRISM_TALENT.id),
    },
    {
      spell: SPELLS.RULE_OF_LAW_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 30,
      charges: 2,
      isActive: combatant => combatant.hasTalent(SPELLS.RULE_OF_LAW_TALENT.id),
      noSuggestion: true,
    },
    {
      spell: SPELLS.DIVINE_PROTECTION,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 60,
      recommendedCastEfficiency: 0.6,
      importance: ISSUE_IMPORTANCE.MINOR,
    },
    {
      spell: SPELLS.ARCANE_TORRENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 90,
      hideWithZeroCasts: true,
    },
    {
      spell: SPELLS.TYRS_DELIVERANCE_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 90,
    },
    {
      spell: SPELLS.HOLY_AVENGER_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 90,
      isActive: combatant => combatant.hasTalent(SPELLS.HOLY_AVENGER_TALENT.id),
    },
    {
      spell: SPELLS.AVENGING_WRATH,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 120,
    },
    {
      spell: SPELLS.BLESSING_OF_SACRIFICE,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 150,
      recommendedCastEfficiency: 0.5,
      noSuggestion: true,
      importance: ISSUE_IMPORTANCE.MINOR,
    },
    {
      spell: SPELLS.AURA_MASTERY,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 180,
    },
    // TODO: Add LoH accounting for relics
    // {
    //   spell: SPELLS.LAY_ON_HANDS,
    //   category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
    //   getCooldown: haste => 600 - http://www.wowhead.com/spell=200326/focused-healing,
    //   recommendedCastEfficiency: 0.5,
    // },
    {
      spell: SPELLS.LIGHT_OF_THE_MARTYR,
      category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
      getCooldown: haste => null,
    },
    {
      spell: SPELLS.FLASH_OF_LIGHT,
      name: `Filler ${SPELLS.FLASH_OF_LIGHT.name}`,
      category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
      getCasts: castCount => (castCount.casts || 0) - (castCount.healingIolHits || 0),
      getCooldown: haste => null,
      getOverhealing: ({ healingEffective, healingAbsorbed, healingOverheal, healingIolHealing, healingIolAbsorbed, healingIolOverheal }) => (healingOverheal - healingIolOverheal) / ((healingEffective - healingIolHealing) + (healingAbsorbed - healingIolAbsorbed) + (healingOverheal - healingIolOverheal)),
    },
    {
      spell: SPELLS.FLASH_OF_LIGHT,
      name: `Infusion of Light ${SPELLS.FLASH_OF_LIGHT.name}`,
      category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
      getCasts: castCount => castCount.healingIolHits || 0,
      getCooldown: haste => null,
      getOverhealing: ({ healingIolHealing, healingIolAbsorbed, healingIolOverheal }) => healingIolOverheal / (healingIolHealing + healingIolAbsorbed + healingIolOverheal),
    },
    {
      spell: SPELLS.HOLY_LIGHT,
      name: `Filler ${SPELLS.HOLY_LIGHT.name}`,
      category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
      getCasts: castCount => (castCount.casts || 0) - (castCount.healingIolHits || 0),
      getCooldown: haste => null,
      getOverhealing: ({ healingEffective, healingAbsorbed, healingOverheal, healingIolHealing, healingIolAbsorbed, healingIolOverheal }) => (healingOverheal - healingIolOverheal) / ((healingEffective - healingIolHealing) + (healingAbsorbed - healingIolAbsorbed) + (healingOverheal - healingIolOverheal)),
    },
    {
      spell: SPELLS.HOLY_LIGHT,
      name: `Infusion of Light ${SPELLS.HOLY_LIGHT.name}`,
      category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
      getCasts: castCount => castCount.healingIolHits || 0,
      getCooldown: haste => null,
      getOverhealing: ({ healingIolHealing, healingIolAbsorbed, healingIolOverheal }) => healingIolOverheal / (healingIolHealing + healingIolAbsorbed + healingIolOverheal),
    },
    {
      spell: SPELLS.DIVINE_STEED,
      category: CastEfficiency.SPELL_CATEGORIES.UTILITY,
      getCooldown: haste => 45,
      isActive: combatant => !combatant.hasTalent(SPELLS.CAVALIER_TALENT.id),
      recommendedCastEfficiency: 0.5,
      noSuggestion: true,
    },
    {
      spell: SPELLS.DIVINE_STEED,
      category: CastEfficiency.SPELL_CATEGORIES.UTILITY,
      getCooldown: haste => 45,
      charges: 2,
      isActive: combatant => combatant.hasTalent(SPELLS.CAVALIER_TALENT.id),
      recommendedCastEfficiency: 0.5,
      noSuggestion: true,
    },
    {
      spell: SPELLS.CRUSADER_STRIKE,
      category: CastEfficiency.SPELL_CATEGORIES.HEALER_DAMAGING_SPELL,
      getCooldown: haste => 4.5 / (1 + haste),
      charges: 2,
      isActive: combatant => !combatant.hasTalent(SPELLS.CRUSADERS_MIGHT_TALENT.id),
      noSuggestion: true,
      noCanBeImproved: true,
    },
    {
      spell: SPELLS.CONSECRATION,
      category: CastEfficiency.SPELL_CATEGORIES.HEALER_DAMAGING_SPELL,
      getCooldown: haste => null,
      noSuggestion: true,
      noCanBeImproved: true,
    },
  ];
}

export default CastEfficiency;
