/**
 * All Demon Hunter abilities except talents go in here. You can also put a talent in here if you want to override something imported in the `./talents` folder, but that should be extremely rare.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  // Vengeance Demon Hunter

  // Tier 20 Bonus:
  VENG_DH_T20_2P_BONUS: {
    id: 242228,
    name: 'Vengeance Demon Hunter T20 2P bonus',
    icon: 'ability_demonhunter_spectank',
  },
  VENG_DH_T20_4P_BONUS: {
    id: 242229,
    name: 'Vengeance Demon Hunter T20 4P bonus',
    icon: 'spell_warlock_soulburn',
  },

  // Tier 20 Bonus Buffs:
  VENG_DH_T20_2P_BONUS_BUFF: {
    id: 246115,
    name: 'Tormented',
    icon: 'ability_demonhunter_vengefulretreat2',
  },
  VENG_DH_T20_4P_BONUS_BUFF: {
    id: 242230,
    name: 'Sigil of Versatility',
    icon: 'spell_warlock_soulburn',
  },

  // Racial:
  ARCANE_TORRENT: {
    id: 202719,
    name: 'Arcane Torrent',
    icon: 'spell_shadow_teleport',
  },

  // Vengeance

  // Passive:
  DEMONIC_WARDS: {
    id: 207014,
    name: 'Demonic Wards',
    icon: 'inv_belt_leather_demonhunter_a_01',
  },
  SEVER: {
    id: 235964,
    name: 'Sever',
    icon: 'ability_demonhunter_manabreak',
  },

  // Abilities:
  SOUL_FRAGMENT: {
    id: 204255,
    name: 'Soul Fragment',
    icon: 'spell_shadow_soulgem',
  },
  SOUL_FRAGMENT_STACK: {
    id: 203981,
    name: 'Soul Fragment',
    icon: 'spell_shadow_soulgem',
  },
  EMPOWER_WARDS: {
    id: 218256,
    name: 'Empower Wards',
    icon: 'ability_demonhunter_empowerwards',
  },
  SIGIL_OF_SILENCE: {
    id: 202137,
    name: 'Sigil of Silence',
    icon: 'ability_demonhunter_sigilofsilence',
  },
  SIGIL_OF_FLAME: {
    id: 204596,
    name: 'Sigil of Flame',
    icon: 'ability_demonhunter_sigilofinquisition',
  },
  SIGIL_OF_FLAME_DEBUFF: {
    id: 204598,
    name: 'Sigil of Flame',
    icon: 'ability_demonhunter_sigilofinquisition',
  },
  SIGIL_OF_MISERY: {
    id: 207684,
    name: 'Sigil of Misery',
    icon: 'ability_demonhunter_sigilofmisery',
  },
  DEMON_SPIKES: {
    id: 203720,
    name: 'Demon Spikes',
    icon: 'ability_demonhunter_demonspikes',
    painCost: 20,
  },
  DEMON_SPIKES_BUFF: {
    id: 203819,
    name: 'Demon Spikes',
    icon: 'ability_demonhunter_demonspikes',
  },
  FIERY_BRAND: {
    id: 204021,
    name: 'Fiery Brand',
    icon: 'ability_demonhunter_fierybrand',
  },
  METAMORPHOSIS_TANK: {
    id: 187827,
    name: 'Metamorphosis',
    icon: 'ability_demonhunter_metamorphasistank',
  },
  SOUL_CLEAVE: {
    id: 228477,
    name: 'Soul Cleave',
    icon: 'ability_demonhunter_soulcleave',
    painCost: 43,
  },
  THROW_GLAIVE: {
    id: 204157,
    name: 'Throw Glaive',
    icon: 'ability_demonhunter_throwglaive',
  },
  IMMOLATION_AURA: {
    id: 178740,
    firstStrikeSpellId: 187727,
    name: 'Immolation Aura',
    icon: 'ability_demonhunter_immolation',
  },
  IMMOLATION_AURA_FIRST_STRIKE: {
    id: 187727,
    name: 'Immolation Aura First Strike',
    icon: 'ability_demonhunter_immolation',
  },
  IMMOLATION_AURA_BUFF: {
    id: 178741,
    name: 'Immolation Aura Buff',
    icon: 'ability_demonhunter_immolation',
  },
  SHEAR: {
    id: 203782,
    name: 'Shear',
    icon: 'ability_demonhunter_hatefulstrike',
  },
  INFERNAL_STRIKE: {
    id: 189110,
    name: 'Infernal Strike',
    icon: 'ability_demonhunter_infernalstrike1',
  },
  TORMENT: {
    id: 185245,
    name: 'Torment',
    icon: 'ability_demonhunter_torment',
  },
  IMPRISON: {
    id: 217832,
    name: 'Imprison',
    icon: 'ability_demonhunter_imprison',
  },

  // Havoc
  DEMONS_BITE: {
    id: 162243,
    name: 'Demon\'s Bite',
    icon: 'inv_weapon_glave_01',
  },
  CHAOS_STRIKE: {
    id: 162794,
    name: 'Chaos Strike',
    icon: 'ability_demonhunter_chaosstrike',
  },
  ANNIHILATION: {
    id: 201427,
    name: 'Annihilation',
    icon: 'inv_glaive_1h_npc_d_02',
  },
  BLADE_DANCE: {
    id: 188499,
    name: 'Blade Dance',
    icon: 'ability_demonhunter_bladedance',
  },
  DEATH_SWEEP: {
    id: 210152,
    name: 'Death Sweep',
    icon: 'inv_glaive_1h_artifactaldrochi_d_02dual',
  },
  FEL_RUSH: {
    id: 195072,
    name: 'Fel Rush',
    icon: 'ability_demonhunter_felrush',
  },
  THROW_GLAIVE_HAVOC: {
    id: 185123,
    name: 'Throw Glaive',
    icon: 'ability_demonhunter_throwglaive',
  },
  EYE_BEAM: {
    id: 198013,
    name: 'Eye Beam',
    icon: 'ability_demonhunter_eyebeam',
  },
  FURY_OF_THE_ILLIDARI: {
    id: 201467,
    name: 'Fury of the Illidari',
    icon: 'inv_glaive_1h_artifactazgalor_d_01',
  },
  CONSUME_MAGIC: {
    id: 183752,
    name: 'Consume Magic',
    icon: 'ability_demonhunter_consumemagic',
  },
  VENGEFUL_RETREAT: {
    id: 198793,
    name: 'Vengeful Retreat',
    icon: 'ability_demonhunter_vengefulretreat2',
  },
  METAMORPHOSIS_HAVOC_BUFF: {
    id: 162264,
    name: 'Metamorphosis',
    icon: 'ability_demonhunter_metamorphasisdps',
  },
  METAMORPHOSIS_HAVOC: {
    id: 200166,
    name: 'Metamorphosis',
    icon: 'ability_demonhunter_metamorphasisdps',
  },
  BLUR: {
    id: 198589,
    name: 'Blur',
    icon: 'ability_demonhunter_blur',
  },
  DARKNESS: {
    id: 196718,
    name: 'Darkness',
    icon: 'ability_demonhunter_darkness',
  },
  CHAOS_NOVA: {
    id: 179057,
    name: 'Chaos Nova',
    icon: 'spell_fire_felfirenova',
  },
  //Havoc Talents
  CHAOS_BLADES_DAMAGE_MH: {
    id: 211796,
    name: 'Chaos Blades',
    icon: 'inv_glaive_1h_artifactaldrochi_d_03dual',
  },
  CHAOS_BLADES_DAMAGE_OH: {
    id: 211797,
    name: 'Chaos Blades',
    icon: 'inv_glaive_1h_artifactaldrochi_d_03dual',
  },
  // Talents
  FRAILTY_SPIRIT_BOMB_DEBUFF: {
    id: 247456,
    name: 'Frailty',
    icon: 'inv_icon_shadowcouncilorb_purple',
  },
  SPIRIT_BOMB_DAMAGE: {
    id: 247455,
    name: 'Spirit Bomb',
    icon: 'inv_icon_shadowcouncilorb_purple',
  },
  FELBLADE_PAIN_GENERATION: {
    id: 213243,
    name: 'Felblade',
    icon: 'ability_demonhunter_felblade',
  },

  // Artifact Traits Vengence:
  SOUL_CARVER: {
    id: 207407,
    name: 'Soul Carver',
    icon: 'inv_glaive_1h_artifactaldrochi_d_01',
  },
  ALDRACHI_DESIGN: {
    id: 207343,
    name: 'Aldrachi Design',
    icon: 'inv_glaive_1h_artifactaldrochi_d_01dual',
  },
  AURA_OF_PAIN: {
    id: 207347,
    name: 'Aura of Pain',
    icon: 'ability_demonhunter_immolation',
  },
  CHARRED_WARBLADES: {
    id: 213010,
    name: 'Charred Warblades',
    icon: 'spell_fire_incinerate',
  },
  CONCORDANCE_OF_THE_LEGIONFALL: {
    id: 239042,
    name: 'Concordance of the Legionfall',
    icon: 'trade_archaeology_shark-jaws',
  },
  DEFENSIVE_SPIKES: {
    id: 212829,
    name: 'Defensive Spikes',
    icon: 'ability_demonhunter_demonspikes',
  },
  DEMONIC_FLAMES: {
    id: 212894,
    name: 'Demonic Flames',
    icon: 'ability_demonhunter_fierybrand',
  },
  DEVOUR_SOULS: {
    id: 212821,
    name: 'Devour Souls',
    icon: 'ability_demonhunter_soulcleave',
  },
  EMBRACE_THE_PAIN: {
    id: 212816,
    name: 'Embrace the Pain',
    icon: 'ability_demonhunter_metamorphasistank',
  },
  ERUPTING_SOULS: {
    id: 238082,
    name: 'Erupting Souls',
    icon: 'ability_demonhunter_soulcleave',
  },
  FIERY_DEMISE: {
    id: 212817,
    name: 'Fiery Demise',
    icon: 'ability_demonhunter_fierybrand',
  },
  FLAMING_SOUL: {
    id: 238118,
    name: 'Flaming Soul',
    icon: 'ability_demonhunter_fierybrand',
  },
  FUELED_BY_PAIN: {
    id: 213017,
    name: 'Fueled by Pain',
    icon: 'ability_demonhunter_metamorphasistank',
  },
  HONED_WARBLADES: {
    id: 207352,
    name: 'Honed Warblades',
    icon: 'ability_demonhunter_hatefulstrike',
  },
  ILLIDARI_DURABILITY: {
    id: 241091,
    name: 'Illidari Durability',
    icon: 'misc_legionfall_demonhunter',
  },
  INFERNAL_FORCE: {
    id: 207375,
    name: 'Infernal Force',
    icon: 'ability_demonhunter_infernalstrike1',
  },
  LINGERING_ORDEAL: {
    id: 238046,
    name: 'Lingering Ordeal',
    icon: 'ability_demonhunter_metamorphasistank',
  },
  PAINBRINGER: {
    id: 207387,
    name: 'Painbringer',
    icon: 'artifactability_vengeancedemonhunter_painbringer',
  },
  SHATTER_THE_SOULS: {
    id: 212827,
    name: 'Shatter the Souls',
    icon: 'ability_demonhunter_shatteredsouls',
  },
  SIPHON_POWER: {
    id: 218910,
    name: 'Siphon Power',
    icon: 'ability_demonhunter_reversemagic',
  },
  SOULGORGER: {
    id: 214909,
    name: 'Soulgorger',
    icon: 'inv_glaive_1h_artifactaldrochi_d_02dual',
  },
  TORMENTED_SOULS: {
    id: 214744,
    name: 'Tormented Souls',
    icon: 'ability_demonhunter_soulcleave',
  },
  WILL_OF_THE_ILLIDARI: {
    id: 212819,
    name: 'Will of the Illidari',
    icon: 'ability_demonhunter_spectank',
  },
  //Artifact Traits Havoc
  UNLEASHED_DEMONS: {
    id: 201460,
    name: 'Unleashed Demons',
    icon: 'ability_demonhunter_metamorphasisdps',
  },
};
