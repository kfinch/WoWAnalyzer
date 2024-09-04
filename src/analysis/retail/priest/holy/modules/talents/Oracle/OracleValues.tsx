import SPELLS from 'common/SPELLS';
import { TALENTS_PRIEST } from 'common/TALENTS';

export const FATEBENDER_SCALER = 1.4;
export const SOLACE_DR = 0.15;
export const PIETY_OVERHEAL_MISDIRECT = 0.7;
export const PIETY_AMP = 0.15;
export const INSIGHT_CDR = 7;
export const PREVENTIVE_MEASURES_DMG_AMP = 0.25;
export const PREVENTIVE_MEASURES_HEAL_AMP = 0.25;
export const PROPHETS_WILL_AMP = 0.3;
export const PREEMPTIVE_CARE_RENEW_DUR = 6_000;

export const INSIGHT_CDR_ABILITIES = [
  TALENTS_PRIEST.ANGELIC_FEATHER_TALENT.id,
  TALENTS_PRIEST.MASS_DISPEL_TALENT.id,
  SPELLS.PSYCHIC_SCREAM.id,
  SPELLS.DESPERATE_PRAYER.id,
  SPELLS.MIND_SOOTHE.id,
  SPELLS.FADE.id,
  TALENTS_PRIEST.POWER_INFUSION_TALENT.id,
  TALENTS_PRIEST.HALO_SHARED_TALENT.id,
  TALENTS_PRIEST.SHADOWFIEND_TALENT.id,
  SPELLS.POWER_WORD_SHIELD.id,
  TALENTS_PRIEST.PRAYER_OF_MENDING_TALENT.id,
  TALENTS_PRIEST.APOTHEOSIS_TALENT.id,
  TALENTS_PRIEST.HOLY_WORD_CHASTISE_TALENT.id,
  SPELLS.HOLY_FIRE.id,
  TALENTS_PRIEST.HOLY_WORD_SANCTIFY_TALENT.id,
  TALENTS_PRIEST.HOLY_WORD_SERENITY_TALENT.id,
  TALENTS_PRIEST.HOLY_WORD_SALVATION_TALENT.id,
  TALENTS_PRIEST.SYMBOL_OF_HOPE_TALENT.id,
  SPELLS.PURIFY.id,
  TALENTS_PRIEST.DIVINE_HYMN_TALENT.id,
  TALENTS_PRIEST.LIGHTWELL_TALENT.id,
  TALENTS_PRIEST.DIVINE_WORD_TALENT.id,
  TALENTS_PRIEST.SHADOW_WORD_DEATH_TALENT.id,
  TALENTS_PRIEST.CIRCLE_OF_HEALING_TALENT.id,
];

export const PROPHETS_WILL_SPELLS_HOLY = [
  SPELLS.FLASH_HEAL,
  TALENTS_PRIEST.HOLY_WORD_SERENITY_TALENT,
  SPELLS.GREATER_HEAL,
];

export const HOLY_DMG_ABILITIES_AFFECTED_BY_PM = [
  SPELLS.HOLY_FIRE,
  SPELLS.HOLY_NOVA_HEAL,
  SPELLS.BURNING_VEHEMENCE_DAMAGE,
  TALENTS_PRIEST.HOLY_NOVA_TALENT,
  SPELLS.SMITE,
];
