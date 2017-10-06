/**
 * All Shaman abilities except talents go in here. You can also put a talent in here if you want to override something imported in the `./talents` folder, but that should be extremely rare.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  ASTRAL_SHIFT: {
    id: 108271,
    name: 'Astral Shift',
    icon: 'ability_shaman_astralshift',
  },
  WIND_SHEAR: {
    id: 57994,
    name: 'Wind Shear',
    icon: 'spell_nature_cyclone',
  },
  // Elemental Shaman
  ELEMENTAL_MASTERY: {
    id: 168534,
    name: 'Elemental Overload',
    icon: 'spell_nature_lightningoverload',
  },
  Resonance_Totem: {
    id: 202192,
    name: 'Resonance Totem',
    icon: 'spell_nature_stoneskintotem',
  },
  EARTH_SHOCK: {
    id: 8042,
    name: 'Earth Shock',
    icon: 'spell_nature_earthshock',
    max_maelstrom: 125, // default without talent
  },
  LAVA_BURST: {
    id: 51505,
    name: 'Lava Burst',
    icon: 'spell_shaman_lavaburst',
  },
  LAVA_BURST_VOLCANIC_INFERNO: {
    id: 205533,
    name: 'Volcanic Inferno',
    icon: 'spell_shaman_lavaflow',
  },
  LAVA_BURST_OVERLOAD: {
    id: 77451,
    name: 'Lava Burst Overload',
    icon: 'spell_shaman_lavaburst',
  },
  LIGHTNING_BOLT: {
    id: 188196,
    name: 'Lightning Bolt',
    icon: 'spell_nature_lightning',
  },
  LIGHTNING_BOLT_INSTANT: {
    id: 214815,
    name: 'Lightning Bolt',
    icon: 'spell_nature_lightning',
  },
  LIGHTNING_BOLT_OVERLOAD: {
    id: 214816,
    name: 'Lightning Bolt Overload',
    icon: 'spell_nature_lightning',
  },
  LIGHTNING_BOLT_OVERLOAD_HIT: {
    id: 45284,
    name: 'Lightning Bolt Overload',
    icon: 'spell_nature_lightning',
  },
  ELEMENTAL_BLAST: {
    id: 117014,
    name: 'Elemental Blast',
    icon: 'shaman_talent_elementalblast',
  },
  ELEMENTAL_BLAST_OVERLOAD: {
    id: 120588,
    name: 'Elemental Blast',
    icon: 'shaman_talent_elementalblast',
  },
  ELEMENTAL_BLAST_HASTE: {
    id: 173183,
    name: 'Elemental Blast: Haste',
    icon: 'shaman_talent_elementalblast',
  },
  ELEMENTAL_BLAST_CRIT: {
    id: 118522,
    name: 'Elemental Blast: Critical Strike',
    icon: 'shaman_talent_elementalblast',
  },
  ELEMENTAL_BLAST_MASTERY: {
    id: 173184,
    name: 'Elemental Blast: Mastery',
    icon: 'shaman_talent_elementalblast',
  },
  CHAIN_LIGHTNING: {
    id: 188443,
    name: 'Chain Lightning',
    icon: 'spell_nature_chainlightning',
  },
  CHAIN_LIGHTNING_INSTANT: {
    id: 195897,
    name: 'Chain Lightning',
    icon: 'spell_nature_chainlightning',
  },
  CHAIN_LIGHTNING_OVERLOAD: {
    id: 45297,
    name: 'Chain Lightning Overload',
    icon: 'spell_nature_chainlightning',
  },
  CHAIN_LIGHTNING_OVERLOAD_UNLIMITED_RANGE: {
    id: 218558,
    name: 'Chain Lightning Overload',
    icon: 'spell_nature_chainlightning',
  },
  LAVA_BEAM: {
    id: 114074,
    name: 'Lava Beam',
    icon: 'ability_mage_firestarter',
  },
  LAVA_BEAM_OVERLOAD: {
    id: 114738,
    name: 'Lava Beam Overload',
    icon: 'spell_fire_soulburn',
  },
  LAVA_BEAM_INSTANT: {
    id: 217891,
    name: 'Lava Beam',
    icon: 'ability_mage_firestarter',
  },
  LAVA_BEAM_OVERLOAD_INSTANT: {
    id: 218559,
    name: 'Lava Beam Overload',
    icon: 'spell_fire_soulburn',
  },
  EARTHQUAKE: {
    id: 61882,
    name: 'Earthquake',
    icon: 'spell_shaman_earthquake',
    maelstrom: 50,
  },
  EARTHQUAKE_DAMAGE: {
    id: 77478,
    name: 'Earthquake',
    icon: 'spell_shaman_earthquake',
  },
  EARTHQUAKE_SEISMIC_LIGHTNING: {
    id: 243073,
    name: 'Seismic Lightning',
    icon: 'inv_misc_stormlordsfavor',
  },
  EARTHQUAKE_CAST_TARGET: {
    id: 182387,
    name: 'Earthquake',
    icon: 'spell_shaman_earthquake',
  },
  EARTHQUAKE_STUNS: {
    id: 77505,
    name: 'Earthquake',
    icon: 'spell_shaman_earthquake',
  },
  LIQUID_MAGMA_TOTEM: {
    id: 192222,
    name: 'Liquid Magma Totem',
    icon: 'spell_shaman_spewlava',
  },
  STORMKEEPER: {
    id: 205495,
    name: 'Stormkeeper',
    icon: 'inv_hand_1h_artifactstormfist_d_01',
    cooldownType: 'DAMAGE',
  },
  ASCENDANCE: {
    id: 114050,
    name: 'Ascendance',
    icon: 'spell_fire_elementaldevastation',
    cooldownType: 'DAMAGE',
  },
  FIRE_ELEMENTAL: {
    id: 198067,
    name: 'Fire Elemental',
    icon: 'spell_fire_elemental_totem',
  },
  FLAME_SHOCK: {
    id: 188389,
    name: 'Flame Shock',
    icon: 'spell_fire_flameshock',
    max_maelstrom: 20,
  },
  FROST_SHOCK: {
    id: 196840,
    name: 'Frost Shock',
    icon: 'spell_frost_frostshock',
    max_maelstrom: 20,
  },
  ICEFURY_OVERLOAD: {
    id: 219271,
    name: 'Icefury Overload',
    icon: 'spell_frost_iceshard',
  },
  POWER_OF_THE_MAELSTROM: {
    id: 191877,
    name: 'Power of the Maelstrom',
    icon: 'spell_fire_masterofelements',
    cooldownType: 'DAMAGE',
  },
  ELEMENTAL_FOCUS: {
    id: 16246,
    name: 'Elemental Focus',
    icon: 'spell_shadow_manaburn',
    cooldownType: 'DAMAGE',
  },
  LAVA_SURGE: {
    id: 77762,
    name: 'Lava Surge',
    icon: 'spell_shaman_lavasurge',
    cooldownType: 'DAMAGE',
  },
  AFTERSHOCK: {
    id: 210712,
    name: 'Aftershock',
    icon: 'spell_nature_stormreach',
  },
  LIGHTNING_ROD: {
    id: 210689,
    name: 'Lightning Rod',
    icon: 'inv_rod_enchantedcobalt',
  },
  LIGHTNING_ROD_DEBUFF: {
    id: 197209,
    name: 'Lightning Rod Buff',
    icon: 'inv_rod_enchantedcobalt',
  },
  LIGHTNING_ROD_DAMAGE: {
    id: 197568,
    name: 'Lightning Rod',
    icon: 'inv_rod_enchantedcobalt',
  },
  NATURES_ESSENCE: {
    id: 191580,
    name: 'Nature\'s Essence',
    icon: 'spell_nature_healingway',
  },
  // Elemental Legendaries
  PRISTINE_PROTOSCALE_GIRDLE: {
    id: 224852,
    name: 'Pristine Proto-Scale Girdle',
    icon: 'spell_shaman_lavaburst',
  },
  THE_DECEIVERS_BLOOD_PACT_BUFF: {
    id: 214134,
    name: 'The Deceiver\'s Blood Pact',
    icon: 'ability_creature_cursed_04',
  },
  // Enhancement Shaman
  ROCKBITER: {
	  id: 193786,
    name: 'Rockbiter',
    icon: 'spell_nature_rockbiter',
  },
  FROSTBRAND: {
    id: 196834,
    name: 'Frostbrand',
    icon: 'spell_shaman_unleashweapon_frost',
  },
  FLAMETONGUE: {
    id: 193796,
    name: 'Flametongue',
    icon: 'spell_fire_flametounge',
  },
  FLAMETONGUE_BUFF: {
    id: 194084,
    name: 'Flametongue',
    icon: 'spell_fire_flametounge',
  },
  CRASH_LIGHTNING: {
    id: 187874,
    name: 'Crash Lightning',
    icon: 'spell_shaman_crashlightning',
    maelstrom: 20,
  },
  FERAL_SPIRIT: {
    id: 51533,
    name: 'Feral Spirit',
    icon: 'spell_shaman_feralspirit',
  },
  STORMSTRIKE: {
    id: 17364,
    name: 'Stormstrike',
    icon: 'ability_shaman_stormstrike',
    maelstrom: 40,
  },
  STORMSTRIKE_BUFF: {
    id: 32175,
    name: 'Stormstrike',
    icon: 'ability_shaman_stormstrike',
  },
  LAVA_LASH: {
    id: 60103,
    name: 'Lava Lash',
    icon: 'ability_shaman_lavalash',
    maelstrom: 30,
  },
  DOOM_WINDS: {
    id: 204945,
    name: 'Doom Winds',
    icon: 'inv_mace_1h_artifactdoomhammer_d_01',
  },
  SUNDERING: {
    id: 197214,
    name: 'Sundering',
    icon: 'ability_rhyolith_lavapool',
  },
  STORMBRINGER: {
    id: 201845,
    name: 'Stormbringer',
    icon: 'spell_nature_stormreach',
  },
  MAELSTROM_WEAPON: {
    id: 187890,
    name: 'Maelstrom Weapon',
    icon: 'spell_shaman_maelstromweapon',
  },
  FERAL_SPIRIT_BUFF: {
    id: 190185,
    name: 'Feral Spirit',
    icon: 'spell_shaman_feralspirit',
  },
  WINDSTRIKE: {
    id: 115356,
    name: 'Windstrike',
    icon: 'ability_skyreach_four_wind',
    maelstrom: 40,
  },
  WORD_OF_RECALL_OLD: {
    id: 1,
    name: 'Word of Recall (OLD)',
    icon: 'trade_engineering',
  },
  DOOM_VORTEX: {
    id: 199116,
    name: 'Doom Vortex',
    icon: 'ability_shaman_stormstrike',
  },
  GHOST_WOLF: {
    id: 2645,
    name: 'Ghost Wolf',
    icon: 'spell_nature_spiritwolf',
  },
  HEALING_SURGE_ENHANCE: {
    id: 188070,
    name: 'Healing Surge',
    icon: 'spell_nature_healingway',
    baseMana: 0.22,
    maelstrom: 20,
  },
  FERAL_LUNGE: {
    id: 196881,
    name: 'Feral Lunge',
    icon: 'spell_beastmaster_wolf',
  },
  FERAL_LUNGE_DAMAGE: {
    id: 215802,
    name: 'Feral Lunge',
    icon: 'spell_beastmaster_wolf',
  },
  BLOODLUST: {
    id: 2825,
    name: 'Bloodlust',
    icon: 'spell_nature_bloodlust',
    baseMana: 0.215,
  },
  HEROISM: {
    id: 32182,
    name: 'Heroism',
    icon: 'ability_shaman_heroism',
    baseMana: 0.215,
  },
  REINCARNATION: {
    id: 21169,
    name: 'Reincarnation',
    icon: 'spell_shaman_improvedreincarnation',
  },
  SPIRIT_WALK: {
    id: 58875,
    name: 'Spirit Walk',
    icon: 'ability_tracking',
  },
  WINDLASH: {
    id: 114089,
    name: 'Windlash',
    icon: 'spell_nature_cyclone',
  },
  STORMLASH: {
    id: 195256,
    name: 'Stormlash',
    icon: 'spell_lightning_lightningbolt01',
  },
  WINDLASH_OFFHAND: {
    id: 114093,
    name: 'Windlash Off-Hand',
    icon: 'spell_nature_cyclone',
  },
  WINDFURY_ATTACK: {
    id: 33750,
    name: 'Windfury Attack',
    icon: 'spell_shaman_unleashweapon_wind',
  },
  ELEMENTAL_HEALING: {
    id: 198249,
    name: 'Elemental Healing',
    icon: 'spell_shaman_improvedreincarnation',
  },
  UNLEASH_LAVA: {
    id: 199053,
    name: 'Unleash Lava',
    icon: 'ability_shaman_stormstrike',
  },
  UNLEASH_LIGHTNING: {
    id: 199054,
    name: 'Unleash Lightning',
    icon: 'ability_shaman_stormstrike',
  },
  FLAMETONGUE_ATTACK: {
    id: 10444,
    name: 'Flametongue Attack',
    icon: 'spell_shaman_unleashweapon_flame',
  },
  WINDSTRIKE_OFFHAND: {
    id: 115360,
    name: 'Windstrike Off-Hand',
    icon: 'ability_skyreach_four_wind',
  },
  STORMSTRIKE_OFFHAND: {
    id: 32176,
    name: 'Stormstrike Off-Hand',
    icon: 'ability_shaman_stormstrike',
  },
  CRASH_LIGHTNING_BUFF: {
    id: 195592,
    name: 'Crash Lightning',
    icon: 'spell_shaman_crashlightning',
  },
  WINDSTRIKE_BUFF: {
    id: 115357,
    name: 'Windstrike',
    icon: 'ability_skyreach_four_wind',
  },
  SPIRIT_OF_THE_MAELSTROM: {
    id: 204880,
    name: 'Spirit of the Maelstrom',
    icon: 'ability_shaman_freedomwolf',
  },
  FURY_OF_AIR_BUFF: {
    id: 197385,
    name: 'Fury of Air',
    icon: 'ability_ironmaidens_swirlingvortex',
  },
  WINDFURY_ATTACK_BUFF: {
    id: 25504,
    name: 'Windfury Attack',
    icon: 'spell_shaman_unleashweapon_wind',
  },
  CRASHING_STORM_BUFF: {
    id: 210801,
    name: 'Crashing Storm',
    icon: 'spell_nature_unrelentingstorm',
  },
  HAILSTORM_BUFF: {
    id: 210854,
    name: 'Hailstorm',
    icon: 'spell_frost_frostbrand',
  },
  LANDSLIDE_BUFF: {
    id: 202004,
    name: 'Landslide',
    icon: 'inv_ore_blackrock_nugget',
  },
  ASCENDANCE_ENHANCE: {
    id: 114051,
    name: 'Ascendance',
    icon: 'spell_fire_elementaldevastation',
    cooldownType: 'DAMAGE',
  },
  ENHANCE_SHAMAN_T20_2SET_BONUS_BUFF: {
    id: 242284,
    name: 'T20 2 set bonus',
    icon: 'spell_shaman_improvedstormstrike',
  },
  //Enhancement Traits
  ALPHA_WOLF_TRAIT: {
    id: 198434,
    name: 'Alpha Wolf',
    icon: 'spell_beastmaster_wolf',
  },
  // Restoration Shaman
  CHAIN_HEAL: {
    id: 1064,
    name: 'Chain Heal',
    icon: 'spell_nature_healingwavegreater',
  },
  HEALING_SURGE_RESTORATION: {
    id: 8004,
    name: 'Healing Surge',
    icon: 'spell_nature_healingway',
  },
  HEALING_WAVE: {
    id: 77472,
    name: 'Healing Waves',
    icon: 'spell_nature_healingwavelesser',
  },
  TIDAL_WAVES_BUFF: {
    id: 53390,
    name: 'Tidal Waves',
    icon: 'spell_shaman_tidalwaves',
  },
  RIPTIDE: {
    id: 61295,
    name: 'Riptide',
    icon: 'spell_nature_riptide',
  },
  HEALING_RAIN_CAST: {
    id: 73920,
    name: 'Healing Rain',
    icon: 'spell_nature_giftofthewaterspirit',
  },
  HEALING_RAIN_HEAL: {
    id: 73921,
    name: 'Healing Rain',
    icon: 'spell_nature_giftofthewaterspirit',
  },
  HEALING_STREAM_TOTEM_CAST: {
    id: 5394,
    name: 'Healing Stream Totem',
    icon: 'inv_spear_04',
  },
  HEALING_STREAM_TOTEM_HEAL: {
    id: 52042,
    name: 'Healing Stream Totem',
    icon: 'inv_spear_04',
  },
  HEALING_TIDE_TOTEM_CAST: {
    id: 108280,
    name: 'Healing Tide Totem',
    icon: 'ability_shaman_healingtide',
  },
  HEALING_TIDE_TOTEM_HEAL: {
    id: 114942,
    name: 'Healing Tide Totem',
    icon: 'ability_shaman_healingtide',
  },
  ANCESTRAL_GUIDANCE_CAST: {
    id: 108281,
    name: 'Ancestral Guidance',
    icon: 'ability_shaman_ancestralguidance',
    cooldownType: 'HEALING',
    description: 'The default choice in this tier. Can generate incredible throughput, especially when combined with <a href="http://www.wowhead.com/spell=157153" target="_blank" rel="noopener noreferrer">Cloudburst Totem</a> and/or <a href="http://www.wowhead.com/spell=114052" target="_blank" rel="noopener noreferrer">Ascendance</a>.',
  },
  ANCESTRAL_GUIDANCE_HEAL: {
    id: 114911,
    name: 'Ancestral Guidance',
    icon: 'ability_shaman_ancestralguidance',
  },
  ASCENDANCE_CAST: {
    id: 114052,
    name: 'Ascendance',
    icon: 'spell_fire_elementaldevastation',
    cooldownType: 'HEALING',
    description: 'Should almost always be combined with <a href="http://www.wowhead.com/spell=157153" target="_blank" rel="noopener noreferrer">Cloudburst Totem</a>. Provides you with an additional healing cooldown, or when combined with <a href="http://www.wowhead.com/spell=108281" target="_blank" rel="noopener noreferrer">Ancestral Guidance</a> makes for what is probably the strongest healing cooldown in the game. Does require proper planning to get value.',
  },
  ASCENDANCE_HEAL: {
    id: 114083,
    name: 'Ascendance',
    icon: 'spell_fire_elementaldevastation',
  },
  SPIRIT_LINK_TOTEM: {
    id: 98008,
    name: 'Spirit Link Totem',
    icon: 'spell_shaman_spiritlink',
  },
  SPIRIT_LINK_TOTEM_REDISTRIBUTE: {
    id: 98021,
    name: 'Spirit Link Totem',
    icon: 'spell_shaman_spiritlink',
  },
  GIFT_OF_THE_QUEEN: {
    id: 207778,
    name: 'Gift of the Queen',
    icon: 'inv_mace_1h_artifactazshara_d_02',
  },
  WELLSPRING: {
    id: 197995,
    name: 'Wellspring',
    icon: 'ability_shawaterelemental_split',
  },
  UNLEASH_LIFE: {
    id: 73685,
    name: 'Unleash Life',
    icon: 'spell_shaman_unleashweapon_life',
  },
  CLOUDBURST_TOTEM_CAST: {
    id: 157153,
    name: 'Cloudburst Totem',
    icon: 'ability_shaman_condensationtotem',
    cooldownType: 'HEALING',
    description: 'Cloudburst Totem will in almost all encounters provide the most throughput when used correctly (see the <a href="https://chainheal.com/resto-shaman-guide-on-how-to-maximize-cloudburst-totem-cbt/">cloudburst totem guide</a> on <a href="http://chainheal.com">ChainHeal.com</a>). Extremely strong synergy with <a href="http://www.wowhead.com/spell=108281" target="_blank" rel="noopener noreferrer">Ancestral Guidance</a> and <a href="http://www.wowhead.com/spell=114052" target="_blank" rel="noopener noreferrer">Ascendance</a>.',
  },
  CLOUDBURST_TOTEM_HEAL: {
    id: 157503,
    name: 'Cloudburst Totem',
    icon: 'ability_shaman_condensationtotem',
  },
  CLOUDBURST_TOTEM_RECALL: {
    id: 201764,
    name: 'Recall Cloudburst Totem',
    icon: 'ability_shaman_condensationtotem',
  },
  EARTHEN_SHIELD_TOTEM_CAST: {
    id: 198838,
    name: 'Earthen Shield Totem',
    icon: 'spell_nature_stoneskintotem',
    description: 'Provides decent throughput, and is very efficient. It\'s unlikely to actually save people from lethal damage, though.',
  },
  EARTHEN_SHIELD_TOTEM_ABSORB: {
    id: 201633,
    name: 'Earthen Shield Totem',
    icon: 'spell_nature_stoneskintotem',
  },
  EARTHEN_SHIELD_TOTEM_SELF_DAMAGE: {
    id: 201657,
    name: 'Earthen Shield Totem',
    icon: 'spell_nature_stoneskintotem',
  },
  RESTORATION_SHAMAN_T19_2SET_BONUS_BUFF: {
    id: 211992,
    name: 'T19 2 set bonus',
    icon: 'spell_shaman_tidalwaves',
  },
  RESTORATION_SHAMAN_T19_4SET_BONUS_BUFF: {
    id: 211993,
    name: 'T19 4 set bonus',
    icon: 'inv_spear_04',
  },
  RESTORATION_SHAMAN_T20_2SET_BONUS_BUFF: {
    id: 242287,
    name: 'T20 2 set bonus',
    icon: 'spell_nature_magicimmunity',
  },
  RESTORATION_SHAMAN_T20_4SET_BONUS_BUFF: {
    id: 242288,
    name: 'T20 4 set bonus',
    icon: 'spell_nature_magicimmunity',
  },
  DEEP_HEALING: {
    id: 77226,
    name: 'Mastery: Deep Healing',
    icon: 'spell_nature_healingtouch',
  },
  ANCESTRAL_VIGOR: {
    id: 207400,
    name: 'Ancestral Vigor',
    icon: 'spell_shaman_blessingoftheeternals',
  },

  // Traits:
  // Restoration Shaman:
  QUEENS_DECREE: {
    id: 208899,
    name: 'Queen\'s Decree',
    icon: 'inv_misc_volatilewater',
  },
  TIDAL_TOTEM: {
    id: 209069,
    name: 'Tidal Totem',
    icon: 'inv_mace_1h_artifactazshara_d_02',
  },
  DEEP_WATERS: {
    id: 238143,
    name: 'Deep Waters',
    icon: 'inv_mace_1h_artifactazshara_d_02',
  },
};
