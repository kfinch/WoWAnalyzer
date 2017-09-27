/**
 * Anything that isn't a class specific ability nor a racial goes in here. You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  // General:
  MELEE: {
    id: 1,
    name: 'Melee',
    icon: 'inv_axe_02',
  },
  LEECH: {
    id: 143924,
    name: 'Leech',
    icon: 'spell_shadow_lifedrain02',
  },
  ANCIENT_HEALING_POTION: {
    id: 188016,
    name: 'Ancient Healing Potion',
    icon: 'inv_alchemy_70_red',
  },
  POTION_OF_PROLONGED_POWER: {
    id: 229206,
    name: 'Potion of Prolonged Power',
    icon: 'trade_alchemy_dpotion_a28',
  },
  POTION_OF_THE_OLD_WAR: {
    id: 188028,
    name: 'Potion of the Old War',
    icon: 'inv_alchemy_70_orange',
  },
  POTION_OF_DEADLY_GRACE: {
    id: 188027,
    name: 'Potion of Deadly Grace',
    icon: 'inv_alchemy_70_flask02',
  },
  LEYTORRENT_POTION: {
    id: 188030,
    name: 'Leytorrent Potion',
    icon: 'inv_alchemy_70_flask01',
  },
  ANCIENT_MANA_POTION: {
    id: 188017,
    name: 'Ancient Mana Potion',
    icon: 'inv_alchemy_70_blue',
  },
  UNBENDING_POTION: {
    id: 127845,
    name: 'Unbending Potion',
    icon: 'inv_alchemy_70_flask04',
  },
  SPIRIT_BERRIES: {
    id: 223573,
    name: 'Spirit Berries',
    icon: 'inv_misc_food_93_skethylberries',
  },
  PURE_RAGE_POTION: {
    id: 175821,
    name: 'Pure Rage Potion',
    icon: 'trade_alchemy_dpotion_a13',
  },
  SUNFRUIT: {
    id: 223595,
    name: 'Sunfruit',
    icon: 'inv_misc_food_42',
  },
  HEALTHSTONE: {
    id: 6262,
    name: 'Healthstone',
    icon: 'warlock_healthstone',
  },
  ANCIENT_REJUVENATION_POTION: {
    id: 188018,
    name: 'Ancient Rejuvenation Potion',
    icon: 'inv_alchemy_70_purple',
  },
  // Items buffs:
  JACINS_RUSE: {
    id: 224149,
    name: 'Jacin\'s Ruse',
    icon: 'sha_ability_rogue_bloodyeye',
  },
  GNAWED_THUMB_RING: {
    id: 228461,
    name: 'Gnawed Thumb Ring',
    icon: 'inv_70_dungeon_ring6a',
    cooldownType: 'HEALING',
  },
  VELENS_FUTURE_SIGHT: {
    id: 235966,
    name: 'Velen\'s Future Sight',
    icon: 'spell_holy_healingfocus',
    cooldownType: 'HEALING',
  },
  XAVARICS_MAGNUM_OPUS: {
    id: 207472,
    name: 'Xavaric\'s Magnum Opus',
    icon: 'ability_vehicle_shellshieldgenerator',
  },
  FRAGILE_ECHO_ENERGIZE: {
    id: 215270,
    name: 'Fragile Echo',
    icon: 'spell_warlock_demonsoul',
  },
  FRAGILE_ECHO_BUFF: {
    id: 215267,
    name: 'Fragile Echo',
    icon: 'spell_warlock_demonsoul',
  },
  XAVARICS_MAGNUM_OPUS_HEAL: {
    id: 207472,
    name: 'Xavaric\'s Magnum Opus',
    icon: 'ability_vehicle_shellshieldgenerator',
  },
  MARK_OF_THE_ACNIENT_PRIESTESS: {
    id: 228401,
    name: 'Mark of the Ancient Priestess',
    icon: 'ability_priest_ascension',
  },
  MARK_OF_THE_HIDDEN_SATYR: {
    id: 191259,
    name: 'Mark of the Hidden Satyr',
    icon: 'sha_spell_fire_fireball02_nightmare',
  },
  // Nighthold Trinkets
  RECURSIVE_STRIKES: {
    id: 225739,
    name: 'Recursive Strikes',
    icon: 'sha_ability_mage_firestarter_nightborne',
  },
  // Tomb trinkets
  CLEANSING_MATRIX: {
    id: 242619,
    name: 'Cleansing Matrix',
    icon: 'inv__wod_arakoa4',
  },
  AOF_INFUSION_OF_LIGHT: {
    id: 242621,
    name: 'Infusion of Light',
    icon: 'spell_shadow_mindshear',
  },
  GUILTY_CONSCIENCE: {
    id: 242327,
    name: 'Guilty Conscience',
    icon: 'spell_shadow_mindshear',
  },
  GUIDING_HAND: {
    id: 242622,
    name: 'Guiding Hand',
    icon: 'spell_shadow_mindshear',
  },
  FRUITFUL_MACHINATIONS: {
    id: 242623,
    name: 'Fruitful Machinations',
    icon: 'spell_shadow_mindshear',
  },
  OCEANS_EMBRACE: {
    id: 242474,
    name: 'Ocean\'s Embrace',
    icon: 'inv_jewelcrafting_starofelune_02',
  },
  CEASELESS_TOXIN: {
    id: 242497,
    name: 'Ceaseless Toxin',
    icon: 'inv_potionc_5',
  },
  SUMMON_DREAD_REFLECTION: {
    id: 246461,
    name: 'Summon Dread Reflection',
    icon: 'spell_warlock_soulburn',
  },
  DREAD_TORRENT: {
    id: 246464,
    name: 'Dread Torrent',
    icon: 'spell_warlock_soulburn',
  },
  INFERNAL_CINDERS: {
    id: 242218,
    name: 'Infernal Cinders',
    icon: 'inv_weapon_shortblade_54',
  },
  UMBRAL_GLAIVE_STORM: {
    id: 242556,
    name: 'Umbral Glaive Storm',
    icon: 'ability_upgrademoonglaive',
  },
  SHATTERING_UMBRAL_GLAIVES: {
    id: 242557,
    name: 'Shattering Umbral Glaives',
    icon: 'ability_upgrademoonglaive',
  },
  STRENGTH_OF_WILL: {
    id: 242642,
    name: 'Strength of Will',
    icon: 'inv_wand_36',
  },
  // Item Abilities
  SPECTRAL_OWL: {
    id: 242570,
    name: 'Spectral Owl',
    icon: 'inv_jewelcrafting_purpleowl',
  },
  SPECTRAL_BLAST: {
    id: 246442,
    name: 'Spectral Blast',
    icon: 'inv_axe_02',
  },
  SPECTRAL_BOLT: {
    id: 242571,
    name: 'Spectral Bolt',
    icon: 'ability_thunderking_thunderstruck',
  },
  SPECTRAL_THURIBLE_DAMAGE: {
    id: 246751,
    name: 'Piercing Anguish',
    icon: 'inv_spear_08',
  },
  TERROR_FROM_BELOW_DAMAGE: {
    id: 242525,
    name: 'Terror From Below',
    icon: 'trade_archaeology_sharkjaws',
  },
  TOME_OF_UNRAVELING_SANITY_DAMAGE: {
    id: 243941,
    name: 'Insidious Corruption',
    icon: 'inv_archaeology_70_demon_flayedskinchronicle',
  },
  LUNAR_INFUSION: {
    id: 242543,
    name: 'Lunar Infusion',
    icon: 'ability_druid_lunarguidance',
  },
  RISING_TIDES: {
    id: 242458,
    name: 'Rising Tides',
    icon: 'inv_7_0raid_trinket_04a',
  },
  // Engine of Eradication buff
  DEMONIC_VIGOR: {
    id: 242612,
    name: 'Demonic Vigor',
    icon: 'inv_relics_warpring',
  },
  MARCH_OF_THE_LEGION: {
    id: 228446,
    name: 'March of the Legion',
    icon: 'ability_warlock_fireandbrimstone',
  },
  KILJAEDENS_BURNING_WISH_DAMAGE: {
    id: 235999,
    name: 'Kil\'jaeden\'s Burning Wish',
    icon: 'sha_spell_fire_bluepyroblast_nightmare',
  },
  KILJAEDENS_BURNING_WISH_CAST: {
    id: 235991,
    name: 'Kil\'jaeden\'s Burning Wish',
    icon: 'sha_spell_fire_bluepyroblast_nightmare',
  },
  ARCHIMONDES_HATRED_REBORN_ABSORB: {
    id: 235169,
    name: 'Archimonde\'s Hatred Reborn',
    icon: 'spell_nature_elementalshields',
  },
  ARCHIMONDES_HATRED_REBORN_DAMAGE: {
    id: 235188,
    name: 'Archimonde\'s Hatred Reborn',
    icon: 'spell_nature_elementalshields',
  },
  DRUMS_OF_FURY: {
    id: 178207,
    name: 'Drums of Fury',
    icon: 'inv_misc_drum_01',
  },
  DRUMS_OF_RAGE: {
    id: 146555,
    name: 'Drums of Rage',
    icon: 'inv_misc_drum_05',
  },
  DRUMS_OF_THE_MOUNTAIN: {
    id: 230935,
    name: 'Drums of the Mountain',
    icon: 'inv_archaeology_70_tauren_drum',
  },
  // Cinidaria
  SYMBIOTE_STRIKE: {
    id: 207694,
    name: 'Symbiote Strike',
    icon: 'inv_leather_raiddruid_m_01belt',
  },

  // Encounter mechanics
  RECURSIVE_STRIKES_ENEMY: {
    id: 218508,
    name: 'Recursive Strikes',
    icon: 'ability_mage_massinvisibility',
  },
  MAGIC_MELEE: {
    id: -32, // No idea why it's negative, but adds with "magic melee attacks" (eels on Mistress/tank add on KJ melee) cast an ability with this ID
    name: 'Melee',
    icon: 'inv_axe_02',
  },
  ASTRAL_VULNERABILITY: {
    id: 236330,
    name: 'Astral Vulnerability',
    icon: 'spell_frost_wisp',
  },
  ANNIHILATION_TRILLIAX: {
    id: 207631,
    name: 'Annihilation',
    icon: 'spell_arcane_arcanetorrent',
  },
  // Netherlight Cruicible Traits
  MURDEROUS_INTENT_TRAIT: {
    id: 252191,
    name: 'Murderous Intent',
    icon: 'spell_shadow_charm',
  },
  MURDEROUS_INTENT_BUFF: {
    id: 252202,
    name: 'Murderous Intent',
    icon: 'spell_shadow_charm',
  },
  REFRACTIVE_SHELL_TRAIT: {
    id: 252207,
    name: 'Refractive Shell',
    icon: 'ability_priest_reflectiveshield',
  },
  REFRACTIVE_SHELL_BUFF: {
    id: 252208,
    name: 'Refractive Shell',
    icon: 'ability_priest_reflectiveshield',
  },
  SHOCKLIGHT_TRAIT: {
    id: 252799,
    name: 'Shocklight',
    icon: 'paladin_icon_speedoflight',
  },
  SHOCKLIGHT_BUFF: {
    id: 252801,
    name: 'Shocklight',
    icon: 'paladin_icon_speedoflight',
  },
  SECURE_IN_THE_LIGHT_TRAIT: {
    id: 253070,
    name: 'Secure in the Light',
    icon: 'ability_paladin_toweroflight',
  },
  SECURE_IN_THE_LIGHT_DAMAGE: {
    id: 253073,
    name: 'Secure in the Light',
    icon: 'ability_paladin_toweroflight',
  },
  HOLY_BULWARK: {
    id: 253072,
    name: 'Holy Bulwark',
    icon: 'ability_paladin_toweroflight',
  },
  INFUSION_OF_LIGHT_TRAIT: {
    id: 253093,
    name: 'Infusion of Light',
    icon: 'ability_malkorok_blightofyshaarj_yellow',
  },
  INFUSION_OF_LIGHT_DAMAGE: {
    id: 253098,
    name: 'Infusion of Light',
    icon: 'ability_malkorok_blightofyshaarj_yellow',
  },
  INFUSION_OF_LIGHT_HEALING: {
    id: 253099,
    name: 'Infusion of Light',
    icon: 'ability_malkorok_blightofyshaarj_yellow',
  },
  LIGHTS_EMBRACE_TRAIT: {
    id: 253111,
    name: 'Light\'s Embrace',
    icon: 'achievement_reputation_07',
  },
  LIGHTS_EMBRACE_HEALING: {
    id: 253216,
    name: 'Light\'s Embrace',
    icon: 'achievement_reputation_07',
  },
  SHADOWBIND_TRAIT: {
    id: 252875,
    name: 'Shadowbind',
    icon: 'spell_shadow_deathpact',
  },
  SHADOWBIND_DAMAGE_HEALING: {
    id: 252879,
    name: 'Shadowbind',
    icon: 'spell_shadow_deathpact',
  },
  CHAOTIC_DARKNESS_TRAIT: {
    id: 252888,
    name: 'Chaotic Darkness',
    icon: 'inv_artifact_powerofthedarkside',
  },
  CHAOTIC_DARKNESS_DAMAGE: {
    id: 252896,
    name: 'Chaotic Darkness',
    icon: 'inv_artifact_powerofthedarkside',
  },
  CHAOTIC_DARKNESS_HEALING: {
    id: 252897,
    name: 'Chaotic Darkness',
    icon: 'inv_artifact_powerofthedarkside',
  },
  TORMENT_THE_WEAK_TRAIT: {
    id: 252906,
    name: 'Torment the Weak',
    icon: 'warlock_curse_weakness',
  },
  TORMENT_THE_WEAK_DAMAGE: {
    id: 252907,
    name: 'Torment the Weak',
    icon: 'warlock_curse_weakness',
  },
  DARK_SORROWS_TRAIT: {
    id: 252922,
    name: 'Dark Sorrows',
    icon: 'inv_heart_of_the_thunder-king_icon',
  },
  DARK_SORROWS_DAMAGE: {
    id: 253022,
    name: 'Dark Sorrows',
    icon: 'inv_heart_of_the_thunder-king_icon',
  },
};
