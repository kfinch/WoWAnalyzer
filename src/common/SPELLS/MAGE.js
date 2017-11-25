/**
 * All Mage abilities except talents go in here. You can also put a talent in here if you want to override something imported in the `./talents` folder, but that should be extremely rare.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  //General
  FROST_NOVA: {
    id: 122,
    name: 'Frost Nova',
    icon: 'spell_frost_frostnova',
  },
  BLINK: {
    id: 1953,
    name: 'Blink',
    icon: 'spell_arcane_blink',
  },
  COUNTERSPELL: {
    id: 2139,
    name: 'Counterspell',
    icon: 'spell_frost_iceshock',
  },
  SLOW_FALL: {
    id: 130,
    name: 'Slow Fall',
    icon: 'spell_magic_featherfall',
  },
  ICE_BLOCK: {
    id: 45438,
    name: 'Ice Block',
    icon: 'spell_frost_frost',
  },
  SPELL_STEAL: {
    id: 30449,
    name: 'Spell Steal',
    icon: 'spell_arcane_arcane02',
  },
  INVISIBILITY: {
    id: 66,
    name: 'Invisibility',
    icon: 'ability_mage_invisibility',
  },
  TIME_WARP: {
    id: 80353,
    name: 'Time Warp',
    icon: 'ability_mage_timewarp',
  },
  RUNE_OF_POWER_BUFF: {
    id: 116014,
    name: 'Rune of Power',
    icon: 'spell_mage_runeofpower',
  },
  MIRROR_IMAGE_SUMMON: {
    id: 88088,
    name: 'Mirror Image',
    icon: 'spell_magic_managain',
  },
  UNSTABLE_MAGIC_DAMAGE_FIRE: {
    id: 157977,
    name: 'Unstable Magic',
    icon: 'spell_mage_unstablemagic',
  },
  UNSTABLE_MAGIC_DAMAGE_FROST: {
    id: 157978,
    name: 'Unstable Magic',
    icon: 'spell_mage_unstablemagic',
  },
  UNSTABLE_MAGIC_DAMAGE_ARCANE: {
    id: 157979,
    name: 'Unstable Magic',
    icon: 'spell_mage_unstablemagic',
  },

  //Frost
  MASTERY_ICICLES: {
    id: 76613,
    name: 'Mastery: Icicles',
    icon: 'spell_frost_iceshard',
  },
  FROSTBOLT: {
    id: 116,
    name: 'Frostbolt',
    icon: 'spell_frost_frostbolt02',
  },
  FROSTBOLT_DAMAGE: {
    id: 228597,
    name: 'Frostbolt',
    icon: 'spell_frost_frostbolt02',
  },
  ICE_LANCE: {
    id: 30455,
    name: 'Ice Lance',
    icon: 'spell_frost_frostblast',
  },
  ICE_LANCE_DAMAGE: {
    id: 228598,
    name: 'Ice Lance',
    icon: 'spell_frost_frostblast',
  },
  BLIZZARD: {
    id: 190356,
    name: 'Blizzard',
    icon: 'spell_frost_icestorm',
  },
  BLIZZARD_DAMAGE: {
    id: 190357,
    name: 'Blizzard',
    icon: 'spell_frost_icestorm',
  },
  FLURRY: {
    id: 44614,
    name: 'Flurry',
    icon: 'ability_warlock_burningembersblue',
  },
  ICE_BARRIER: {
    id: 11426,
    name: 'Ice Barrier',
    icon: 'spell_ice_lament',
  },
  CONE_OF_COLD: {
    id: 120,
    name: 'Cone of Cold',
    icon: 'spell_frost_glacier',
  },
  ICY_VEINS: {
    id: 12472,
    name: 'Icy Veins',
    icon: 'spell_frost_coldhearted',
  },
  COLD_SNAP: {
    id: 235219,
    name: 'Cold Snap',
    icon: 'spell_frost_wizardmark',
  },
  FROZEN_ORB: {
    id: 84714,
    name: 'Frozen Orb',
    icon: 'spell_frost_frozenorb',
  },
  SUMMON_WATER_ELEMENTAL: {
    id: 31687,
    name: 'Summon Water Elemental',
    icon: 'spell_frost_summonwaterelemental_2',
  },
  WATER_JET: {
    id: 135029,
    name: 'Water Jet',
    icon: 'ability_mage_waterjet',
  },
  EBONBOLT: {
    id: 214634,
    name: 'Ebonbolt',
    icon: 'artifactability_frostmage_ebonbolt',
  },
  EBONBOLT_DAMAGE: {
    id: 228599,
    name: 'Ebonbolt',
    icon: 'artifactability_frostmage_ebonbolt',
  },
  COMET_STORM_DAMAGE: {
    id: 153596,
    name: 'Comet Storm',
    icon: 'spell_mage_cometstorm',
  },
  FROST_BOMB_DAMAGE: {
    id: 113092,
    name: 'Frost Bomb',
    icon: 'spell_mage_frostbomb',
  },
  GLACIAL_SPIKE_DAMAGE: {
    id: 228600,
    name: 'Glacial Spike',
    icon: 'spell_frost_frostbolt',
  },
  RING_OF_FROST_DAMAGE: {
    id: 82691,
    name: 'Ring of Frost',
    icon: 'spell_frost_ring-of-frost',
  },
  ICE_TIME_FROST_NOVA: { // proc from Ice Time, which is called "Frost Nova" for some reason
    id: 235235,
    name: 'Frost Nova',
    icon: 'spell_frost_frostnova',
  },

  //Fire
  FIREBALL: {
    id: 133,
    name: 'Fireball',
    icon: 'spell_fire_flamebolt',
  },
  PYROBLAST: {
    id: 11366,
    name: 'Pyroblast',
    icon: 'spell_fire_fireball02',
  },
  FIRE_BLAST: {
    id: 108853,
    name: 'Fire Blast',
    icon: 'spell_fire_fireball',
  },
  BLAZING_BARRIER: {
    id: 235313,
    name: 'Blazing Barrier',
    icon: 'ability_mage_moltenarmor',
  },
  FLAMESTRIKE: {
    id: 2120,
    name: 'Flamestrike',
    icon: 'spell_fire_selfdestruct',
  },
  SCORCH: {
    id: 2948,
    name: 'Scorch',
    icon: 'spell_fire_soulburn',
  },
  PHOENIXS_FLAMES: {
    id: 194466,
    name: 'Phoenix\'s Flames',
    icon: 'artifactability_firemage_phoenixbolt',
  },
  DRAGONS_BREATH: {
    id: 31661,
    name: 'Dragon\'s Breath',
    icon: 'inv_misc_head_dragon_01',
  },
  PHOENIX_REBORN: {
    id: 215775,
    name: 'Phoenix Reborn',
    icon: 'inv_misc_phoenixegg',
  },
  METEOR_DAMAGE: {
    id: 153564,
    name: 'Meteor',
    icon: 'spell_mage_meteor',
  },
  CINDERSTORM_DAMAGE: {
    id: 198928,
    name: 'Cinderstorm',
    icon: 'spell_fire_flare',
  },
  MASTERY_IGNITE: {
    id: 12846,
    name: 'Mastery: Ignite',
    icon: 'spell_fire_incinerate',
  },
  IGNITE: {
    id: 12654,
    name: 'Ignite',
    icon: 'spell_fire_incinerate',
  },

  //Arcane
  ARCANE_BLAST: {
    id: 30451,
    name: 'Arcane Blast',
    icon: 'spell_arcane_blast',
  },

  //Passives
  SHATTER: {
    id: 12982,
    name: 'Shatter',
    icon: 'spell_frost_frostshock',
  },
  FREEZE: {
    id: 33395,
    name: 'Freeze',
    icon: 'spell_frost_frostshock',
  },
  GLACIAL_ERUPTION: {
    id: 242851,
    name: 'Glacial Eruption',
    icon: 'creatureportrait_creature_iceblock',
  },
  ICICLE_DAMAGE: {
    id: 148022,
    name: 'Icicle',
    icon: 'spell_frost_iceshard',
  },

  //Buffs
  BRAIN_FREEZE: {
    id: 190446,
    name: 'Brain Freeze',
    icon: 'ability_mage_brainfreeze',
  },
  FINGERS_OF_FROST: {
    id: 44544,
    name: 'Fingers of Frost',
    icon: 'ability_mage_wintersgrasp',
  },
  WINTERS_CHILL: {
    id: 228358,
    name: 'Winter\'s Chill',
    icon: 'spell_frost_frostward',
  },
  GLACIAL_SPIKE_BUFF: {
    id: 199844,
    name: 'Glacial Spike!',
    icon: 'spell_frost_frostbolt',
  },
  ICICLES_BUFF: {
    id: 205473,
    name: 'Icicles',
    icon: 'spell_frost_iceshard',
  },
  FROZEN_MASS: {
    id: 242253,
    name: 'Frozen Mass',
    icon: 'spell_frost_frozenorb',
  },
  ZANNESU_JOURNEY_BUFF: {
    id: 226852,
    name: 'Zann\'esu Journey',
    icon: 'inv_belt_71',
  },
  MAGTHERIDONS_MIGHT_BUFF: {
    id: 214404,
    name: 'Magtheridon\'s Might',
    icon: 'inv_bracer_64v1',
  },
  RAGE_OF_THE_FROST_WYRM: {
    id: 248177,
    name: 'Rage of the Frost Wyrm',
    icon: 'spell_frost_ice-shards',
  },
  HEATING_UP: {
    id: 48107,
    name: 'Heating Up',
    icon: 'ability_mage_hotstreak',
  },
  HOT_STREAK_BUFF: {
    id: 48108,
    name: 'Hot Streak!',
    icon: 'ability_ironmaidens_grapeshotblast',
  },
  COMBUSTION: {
    id: 190319,
    name: 'Combustion',
    icon: 'spell_fire_sealoffire',
  },
  CAUTERIZE: {
    id: 108843,
    name: 'Cauterize',
    icon: 'spell_fire_burningspeed',
  },
  ENHANCED_PYROTECHNICS: {
    id: 157644,
    name: 'Enhanced Pyrotechnics',
    icon: 'spell_fire_firebolt02',
  },
  FRENETIC_SPEED: {
    id: 236060,
    name: 'Frenetic Speed',
    icon: 'spell_fire_burningspeed',
  },
  CRITICAL_MASSIVE: {
    id: 242251,
    name: 'Critical Massive',
    icon: 'ability_mage_firestarter',
  },

  //Artifact Traits
  FROZEN_VEINS_TRAIT: {
    id: 195345,
    name: 'Frozen Veins',
    icon: 'spell_frost_coldhearted',
  },
  ICE_NINE: {
    id: 214664,
    name: 'Ice Nine',
    icon: 'spell_frost_iceshard',
  },
  WARMTH_OF_THE_PHOENIX: {
    id: 240671,
    name: 'Warmth of the Phoenix',
    icon: 'artifactability_firemage_phoenixbolt',
  },
  PHOENIX_REBORN_TRAIT: {
    id: 215773,
    name: 'Phoenix Reborn',
    icon: 'inv_sword_1h_artifactfelomelorn_d_01',
  },
  EVERBURNING_CONSUMPTION_TRAIT: {
    id: 194314,
    name: 'Everburning Consuption',
    icon: 'ability_felarakkoa_feldetonation_red',
  },
  ERUPTING_INFERNAL_CORE: {
    id: 248147,
    name: 'Erupting Infernal Core',
    icon: 'spell_mage_flameorb',
  },

  //Tier Sets
  FROST_MAGE_T20_2SET_BONUS_BUFF: {
    id: 242252,
    name: 'T20 2 set bonus',
    icon: 'spell_frost_frostbolt02',
  },
  FROST_MAGE_T20_4SET_BONUS_BUFF: {
    id: 242254,
    name: 'T20 4 set bonus',
    icon: 'spell_frost_frostbolt02',
  },
  FIRE_MAGE_T20_2SET_BONUS_BUFF: {
    id: 242249,
    name: 'T20 2 set bonus',
    icon: 'spell_fire_firebolt02',
  },
  FIRE_MAGE_T20_4SET_BONUS_BUFF: {
    id: 242250,
    name: 'T20 4 set bonus',
    icon: 'spell_fire_firebolt02',
  },

};
