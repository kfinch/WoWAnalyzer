import SPELLS from 'common/SPELLS';

export const getSpellInfo = id => {
  return HEAL_INFO[id] || DEFAULT_INFO;
};

const DEFAULT_INFO = {
  int: false,
  crit: false,
  hasteHpm: false,
  hasteHpct: false,
  mastery: false,
  masteryStack: false,
  vers: true,
};

export const HEAL_INFO = {
  [SPELLS.REJUVENATION.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: true,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.REJUVENATION_GERMINATION.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: true,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.REGROWTH.id]: { // TODO how handle direct vs HoT? Enteries for direct for now.
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: true,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.WILD_GROWTH.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: false,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.CULTIVATION.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: true, // an approximation, because this is applied by Rejuv
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.SPRING_BLOSSOMS.id]: {
    int: true,
    crit: true,
    hasteHpm: true, // an approximation, because faster ticking Efflo will apply more
    hasteHpct: false,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.CENARION_WARD.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: false,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.FRENZIED_REGENERATION.id]: { // TODO does this actually scale with nothing?
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: true,
    vers: false,
  },
  [SPELLS.LIFEBLOOM_HOT_HEAL.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: false,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
  [SPELLS.LIFEBLOOM_BLOOM_HEAL.id]: {
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: false,
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.HEALING_TOUCH.id]: {
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: true,
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.SWIFTMEND.id]: {
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: false,
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.LIVING_SEED.id]: { // an approximation based on what likely procced it
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: true,
    mastery: true,
    masteryStack: false,
    vers: true,
    isLivingSeed: true, // obviously we need special case handling for crit w/ Living Seed
  },
  [SPELLS.TRANQUILITY_HEAL.id]: {
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: false,
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.EFFLORESCENCE_HEAL.id]: {
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: false,
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.DREAMWALKER.id]: {
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: true, // an approximation, because this scales with number of rejuvs out
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.NATURES_ESSENCE_DRUID.id]: {
    int: true,
    crit: true,
    hasteHpm: false,
    hasteHpct: false,
    mastery: true,
    masteryStack: false,
    vers: true,
  },
  [SPELLS.YSERAS_GIFT_1.id]: { // TODO does it really scale with nothing (except stam)?
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: false,
    vers: false,
  },
  [SPELLS.YSERAS_GIFT_2.id]: { // TODO does it really scale with nothing (except stam)?
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: false,
    vers: false,
  },
  [SPELLS.RENEWAL.id]: { // TODO does it really scale with nothing (except stam)?
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: false,
    vers: false,
  },
  [SPELLS.MARK_OF_SHIFTING.id]: { // TODO does it really scale with nothing (except stam)?
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: false,
    vers: false,
  },
  [SPELLS.XAVARICS_MAGNUM_OPUS.id]: { // TODO does it really scale with nothing (except stam)?
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: false,
    vers: false,
  },
  [SPELLS.LEECH.id]: { // after a fashion this scales with everything, but for the purpose of stat weights better to say "nothing"
    int: false,
    crit: false,
    hasteHpm: false,
    hasteHpct: false,
    mastery: false,
    masteryStack: false,
    vers: false,
  },
  [SPELLS.DREAMER.id]: { // T21 2pc TODO double check this once its live
    int: true,
    crit: true,
    hasteHpm: true,
    hasteHpct: false,
    mastery: true,
    masteryStack: true,
    vers: true,
  },
};
