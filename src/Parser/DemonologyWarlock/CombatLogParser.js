import React from 'react';

import SuggestionsTab from 'Main/SuggestionsTab';
import Tab from 'Main/Tab';
import Talents from 'Main/Talents';

import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import DamageDone from 'Parser/Core/Modules/DamageDone';

import CastEfficiency from './Modules/Features/CastEfficiency';
import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import CooldownTracker from './Modules/Features/CooldownTracker';
import DoomguardInfernal from './Modules/Features/DoomguardInfernal';
import Felstorm from './Modules/Features/Felstorm';

import Doom from './Modules/Features/DoomUptime';

import SoulShardTracker from './Modules/SoulShards/SoulShardTracker';
import SoulShardDetails from './Modules/SoulShards/SoulShardDetails';
import DemoPets from './Modules/WarlockCore/Pets';

import ShadowyInspiration from './Modules/Talents/ShadowyInspiration';
import Shadowflame from './Modules/Talents/Shadowflame';
import DemonicCalling from './Modules/Talents/DemonicCalling';
import ImpendingDoom from './Modules/Talents/ImpendingDoom';
import ImprovedDreadstalkers from './Modules/Talents/ImprovedDreadstalkers';
import Implosion from './Modules/Talents/Implosion';
import HandOfDoom from './Modules/Talents/HandOfDoom';
import SoulHarvest from './Modules/Talents/SoulHarvest';
import SoulHarvestTalent from './Modules/Talents/SoulHarvestTalent';
import GrimoireOfService from './Modules/Talents/GrimoireOfService';
import GrimoireOfSynergy from './Modules/Talents/GrimoireOfSynergy';
import SummonDarkglare from './Modules/Talents/SummonDarkglare';
import Demonbolt from './Modules/Talents/Demonbolt';

import WakenersLoyalty from './Modules/Items/Legendaries/WakenersLoyalty';
import RecurrentRitual from './Modules/Items/Legendaries/RecurrentRitual';
import SindoreiSpite from './Modules/Items/Legendaries/SindoreiSpite';
import KazzaksFinalCurse from './Modules/Items/Legendaries/KazzaksFinalCurse';
import WilfredRing from './Modules/Items/Legendaries/WilfredRing';
import TheMasterHarvester from './Modules/Items/Legendaries/TheMasterHarvester';
import SoulOfTheNetherlord from './Modules/Items/Legendaries/SoulOfTheNetherlord';

import T20_2set from './Modules/Items/T20_2set';
import T20_4set from './Modules/Items/T20_4set';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Features
    castEfficiency: CastEfficiency,
    alwaysBeCasting: AlwaysBeCasting,
    cooldownTracker: CooldownTracker,
    damageDone: [DamageDone, { showStatistic: true }],
    doomguardInfernal: DoomguardInfernal,
    felstorm: Felstorm,

    // DoTs
    doom: Doom,

    // Core
    soulShardTracker: SoulShardTracker,
    soulShardDetails: SoulShardDetails,
    demoPets: DemoPets,

    // Talents
    shadowyInspiration: ShadowyInspiration,
    shadowflame: Shadowflame,
    demonicCalling: DemonicCalling,
    impendingDoom: ImpendingDoom,
    improvedDreadstalkers: ImprovedDreadstalkers,
    implosion: Implosion,
    handOfDoom: HandOfDoom,
    soulHarvest: SoulHarvest,
    soulHarvestTalent: SoulHarvestTalent,
    grimoireOfService: GrimoireOfService,
    grimoireOfSynergy: GrimoireOfSynergy,
    summonDarkglare: SummonDarkglare,
    demonbolt: Demonbolt,

    // Legendaries
    wakenersLoyalty: WakenersLoyalty,
    recurrentRitual: RecurrentRitual,
    sindoreiSpite: SindoreiSpite,
    kazzaksFinalCurse: KazzaksFinalCurse,
    wilfredRing: WilfredRing,
    masterHarvester: TheMasterHarvester,
    soulOfTheNetherlord: SoulOfTheNetherlord,

    // Items
    t20_2set: T20_2set,
    t20_4set: T20_4set,
  };

  generateResults() {
    const results = super.generateResults();
    results.tabs = [
      {
        title: 'Suggestions',
        url: 'suggestions',
        render: () => (
          <SuggestionsTab issues={results.issues} />
        ),
      },
      {
        title: 'Talents',
        url: 'talents',
        render: () => (
          <Tab title="Talents">
            <Talents combatant={this.modules.combatants.selected} />
          </Tab>
        ),
      },
      ...results.tabs,
    ];

    return results;
  }
}

export default CombatLogParser;
