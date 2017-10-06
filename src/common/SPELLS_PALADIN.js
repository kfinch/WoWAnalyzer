/**
 * All Paladin abilities except talents go in here. You can also put a talent in here if you want to override something imported in the `./talents` folder, but that should be extremely rare.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

import TALENTS from 'common/talents/TALENTS_PALADIN';

export default {
  // Paladin:
  CRUSADER_STRIKE: {
    id: 35395,
    name: 'Crusader Strike',
    icon: 'spell_holy_crusaderstrike',
  },
  JUDGMENT_CAST: {
    id: 20271,
    name: 'Judgment',
    icon: 'spell_holy_righteousfury',
    manaCost: 6600,
  },
  DIVINE_STEED: {
    id: 190784,
    name: 'Divine Steed',
    icon: 'ability_paladin_divinesteed',
  },
  HAND_OF_RECKONING: {
    id: 62124,
    name: 'Hand of Reckoning',
    icon: 'spell_holy_unyieldingfaith',
  },
  LAY_ON_HANDS: {
    id: 633,
    name: 'Lay on Hands',
    icon: 'spell_holy_layonhands',
  },
  BLESSING_OF_FREEDOM: {
    id: 1044,
    name: 'Blessing of Freedom',
    icon: 'spell_holy_sealofvalor',
  },
  FLASH_OF_LIGHT: {
    id: 19750,
    name: 'Flash of Light',
    icon: 'spell_holy_flashheal',
    manaCost: 39600,
    baseMana: 0.18,
  },

  // Holy Paladin:
  // Fix talent mana costs (due to rounding errors)
  BEACON_OF_FAITH_TALENT: { ...TALENTS.BEACON_OF_FAITH_TALENT, manaCost: 6875 },
  BEACON_OF_LIGHT: {
    id: 53652,
    name: 'Beacon of Light',
    icon: 'ability_paladin_beaconoflight',
  },
  HOLY_SHOCK_CAST: {
    id: 20473,
    name: 'Holy Shock',
    icon: 'spell_holy_searinglight',
    manaCost: 22000,
  },
  HOLY_SHOCK_HEAL: {
    id: 25914,
    name: 'Holy Shock',
    icon: 'spell_holy_searinglight',
  },
  HOLY_SHOCK_DAMAGE: {
    id: 25912,
    name: 'Holy Shock',
    icon: 'spell_holy_searinglight',
  },
  LIGHT_OF_DAWN_HEAL: {
    id: 225311,
    name: 'Light of Dawn',
    icon: 'spell_paladin_lightofdawn',
  },
  LIGHT_OF_DAWN_CAST: {
    id: 85222,
    name: 'Light of Dawn',
    icon: 'spell_paladin_lightofdawn',
    manaCost: 30800,
  },
  HOLY_LIGHT: {
    id: 82326,
    name: 'Holy Light',
    icon: 'spell_holy_surgeoflight',
    manaCost: 26400,
  },
  LIGHT_OF_THE_MARTYR: {
    id: 183998,
    name: 'Light of the Martyr',
    icon: 'ability_paladin_lightofthemartyr',
    manaCost: 16500,
  },
  LIGHT_OF_THE_MARTYR_DAMAGE_TAKEN: {
    id: 196917,
    name: 'Light of the Martyr',
    icon: 'ability_paladin_lightofthemartyr',
  },
  HOLY_PRISM_HEAL: {
    id: 114852,
    name: 'Holy Prism',
    icon: 'spell_paladin_holyprism',
  },
  LIGHTS_HAMMER_HEAL: {
    id: 119952,
    name: 'Light\'s Hammer',
    icon: 'spell_paladin_lightshammer',
  },
  TYRS_DELIVERANCE_HEAL: {
    id: 200654,
    name: 'Tyr\'s Deliverance',
    icon: 'inv_mace_2h_artifactsilverhand_d_01',
  },
  TYRS_DELIVERANCE_CAST: {
    id: 200652,
    name: 'Tyr\'s Deliverance',
    icon: 'inv_mace_2h_artifactsilverhand_d_01',
  },
  CONSECRATION: {
    id: 204242,
    name: 'Consecration',
    icon: 'spell_holy_innerfire',
  },
  JUDGMENT_OF_LIGHT_HEAL: {
    id: 183811,
    name: 'Judgment of Light',
    icon: 'spell_holy_divineprovidence',
  },
  AURA_MASTERY: {
    id: 31821,
    name: 'Aura Mastery',
    icon: 'spell_holy_auramastery',
    cooldownType: 'HEALING',
  },
  AURA_OF_MERCY_HEAL: {
    id: 210291,
    name: 'Aura of Mercy',
    icon: 'spell_holy_blessedlife',
  },
  AURA_OF_SACRIFICE_HEAL: {
    id: 210383,
    name: 'Aura of Sacrifice',
    icon: 'ability_deathwing_bloodcorruption_earth',
  },
  DIVINE_PROTECTION: {
    id: 498,
    name: 'Divine Protection',
    icon: 'spell_holy_divineprotection',
  },
  BLESSING_OF_SACRIFICE: {
    id: 6940,
    name: 'Blessing of Sacrifice',
    icon: 'spell_holy_sealofsacrifice',
  },
  AVENGING_WRATH: {
    id: 31842,
    name: 'Avenging Wrath',
    icon: 'spell_holy_avenginewrath',
    cooldownType: 'HEALING',
  },
  BEACON_OF_LIGHT_BUFF: {
    id: 53563,
    name: 'Beacon of Light',
    icon: 'ability_paladin_beaconoflight',
  },
  HOLY_PALADIN_T19_4SET_BONUS_BUFF: {
    id: 211438,
    name: 'T19 4 set bonus',
    icon: 'ability_paladin_infusionoflight',
  },
  HOLY_PALADIN_T20_2SET_BONUS_BUFF: {
    id: 242261,
    name: 'T20 2 set bonus',
    icon: 'spell_holy_holybolt',
  },
  HOLY_PALADIN_T20_4SET_BONUS_BUFF: {
    id: 242262,
    name: 'T20 4 set bonus',
    icon: 'ability_paladin_beaconoflight',
  },
  LIGHTS_EMBRACE_BUFF: {
    id: 247237,
    name: 'Light\'s Embrace',
    icon: 'spell_holy_holybolt',
  },
  HOLY_PALADIN_T21_2SET_BONUS_BUFF: {
    id: 251863,
    name: 'T21 2 set bonus',
    icon: 'ability_paladin_conviction',
  },
  HOLY_PALADIN_T21_4SET_BONUS_BUFF: {
    id: 251865,
    name: 'T21 4 set bonus',
    icon: 'ability_paladin_conviction',
  },
  PURITY_OF_LIGHT: {
    id: 254332,
    name: 'Purity of Light',
    icon: 'ability_paladin_conviction',
  },
  INFUSION_OF_LIGHT: {
    id: 54149,
    name: 'Infusion of Light',
    icon: 'ability_paladin_infusionoflight',
  },
  DIVINE_PURPOSE_HOLY_SHOCK_BUFF: {
    id: 216411,
    name: 'Divine Purpose',
    icon: 'spell_holy_divinepurpose',
  },
  DIVINE_PURPOSE_LIGHT_OF_DAWN_BUFF: {
    id: 216413,
    name: 'Divine Purpose',
    icon: 'spell_holy_divinepurpose',
  },
  // Retribution Paladin:
  JUDGMENT_DEBUFF: {
    id: 197277,
    name: 'Judgment',
    icon: 'spell_holy_righteousfury',
  },
  TEMPLARS_VERDICT_DAMAGE: {
    id: 224266,
    name: 'Templar\'s Verdict',
    icon: 'spell_paladin_templarsverdict',
  },
  TEMPLARS_VERDICT: {
    id: 85256,
    name: 'Templar\'s Verdict',
    icon: 'spell_paladin_templarsverdict',
  },
  BLADE_OF_JUSTICE: {
    id: 184575,
    name: 'Blade of Justice',
    icon: 'ability_paladin_bladeofjustice',
  },
  DIVINE_HAMMER_HIT: {
    id: 198137,
    name: 'Divine Hammer',
    icon: 'spell_holy_auraoflight',
  },
  DIVINE_STORM_DAMAGE: {
    id: 224239,
    name: 'Divine Storm',
    icon: 'ability_paladin_divinestorm',
  },
  DIVINE_STORM: {
    id: 53385,
    name: 'Divine Storm',
    icon: 'ability_paladin_divinestorm',
  },
  WAKE_OF_ASHES: {
    id: 205273,
    name: 'Wake of Ashes',
    icon: 'inv_sword_2h_artifactashbringer_d_01',
  },
  WAKE_OF_ASHES_HP_GEN: {
    id: 218001,
    name: 'Wake of Ashes',
    icon: 'inv_sword_2h_artifactashbringer_d_01',
  },
  SHIELD_OF_VENGEANCE: {
    id: 184662,
    name: 'Shield of Vengeance',
    icon: 'ability_paladin_shieldofthetemplar',
  },
  DIVINE_PURPOSE_BUFF: {
    id: 223819,
    name: 'Divine Purpose',
    icon: 'spell_holy_mindvision',
  },
  AVENGING_WRATH_RET: {
    id: 31884,
    name: 'Avenging Wrath',
    icon: 'spell_holy_avenginewrath',
  },
  BLADE_OF_WRATH_PROC: {
    id: 231843,
    name: 'Blade of Wrath',
    icon: 'ability_paladin_bladeofjusticeblue',
  },
  RETRIBUTION_BUFF: {
    id: 183436,
    name: 'Retribution',
    icon: 'spell_holy_crusade',
  },
  // Ret Item Effects
  WHISPER_OF_THE_NATHREZIM_BUFF: {
    id: 207635,
    name: 'Whisper of the Nathrezim',
    icon: 'ability_paladin_sheathoflight',
  },
  LIADRINS_FURY_UNLEASHED_BUFF: {
    id: 208410,
    name: 'Liandrin\'s Fury Unleashed',
    icon: 'inv_jewelry_ring_61',
  },
  RET_PALADIN_T19_2SET_BONUS: {
    id: 211444,
    name: 'T19 2 set bonus',
    icon: 'inv_helm_plate_raidpaladinmythic_q_01',
  },
  RET_PALADIN_T19_4SET_BONUS: {
    id: 211448,
    name: 'T19 4 set bonus',
    icon: 'inv_cape_plate_raidpaladinmythic_q_01',
  },
  RET_PALADIN_T19_4SET_HP_GEN: {
    id: 231372,
    name: 'T19 4 set bonus',
    icon: 'inv_helm_plate_raidpaladinmythic_q_01',
  },
  RET_PALADIN_T20_2SET_BONUS: {
    id: 242267,
    name: 'T19 2 set bonus',
    icon: 'paladin_retribution',
  },
  RET_PALADIN_T20_2SET_BONUS_BUFF: {
    id: 246973,
    name: 'T20 2 set bonus',
    icon: 'paladin_retribution',
  },
  RET_PALADIN_T20_4SET_BONUS: {
    id: 242266,
    name: 'T20 4 set bonus',
    icon: 'paladin_retribution',
  },
  // Traits:
  // Holy Paladin:
  PROTECTION_OF_TYR: {
    id: 211210,
    name: 'Protection of Tyr',
    icon: 'spell_holy_auramastery',
  },
  SACRED_DAWN: {
    id: 238132,
    name: 'Sacred Dawn',
    icon: 'spell_paladin_lightofdawn',
  },
  SHOCK_TREATMENT: {
    id: 200315,
    name: 'Shock Treatment',
    icon: 'spell_holy_searinglight',
  },
  DELIVER_THE_LIGHT: {
    id: 200294,
    name: 'Deliver the Light',
    icon: 'spell_holy_surgeoflight',
  },
  EXPEL_THE_DARKNESS: {
    id: 200296,
    name: 'Expel the Darkness',
    icon: 'spell_paladin_lightofdawn',
  },
  SECOND_SUNRISE: {
    id: 200482,
    name: 'Second Sunrise',
    icon: 'spell_paladin_lightofdawn',
  },
  TYRS_MUNIFICENCE: {
    id: 238060,
    name: 'Tyr\'s Munificence',
    icon: 'inv_mace_2h_artifactsilverhand_d_01',
  },
  JUSTICE_THROUGH_SACRIFICE: {
    id: 200316,
    name: 'Justice through Sacrifice',
    icon: 'spell_holy_power',
  },
  // Retribution Paladin:
  DEFLECTION: {
    id: 184778,
    name: 'Deflection',
    icon: 'ability_paladin_gaurdedbythelight',
  },
};
