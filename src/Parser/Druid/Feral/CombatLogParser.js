import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import DamageDone from 'Parser/Core/Modules/DamageDone';

import Abilities from './Modules/Features/Abilities';
import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import CooldownThroughputTracker from './Modules/Features/CooldownThroughputTracker';
import RakeUptime from './Modules/Bleeds/RakeUptime';
import RipUptime from './Modules/Bleeds/RipUptime';
import FerociousBiteEnergy from './Modules/Features/FerociousBiteEnergy';

import ComboPointTracker from './Modules/ComboPoints/ComboPointTracker';
import ComboPointDetails from './Modules/ComboPoints/ComboPointDetails';
import EnergyTracker from './Modules/Energy/EnergyTracker';
import EnergyDetails from './Modules/Energy/EnergyDetails';

import SavageRoarUptime from './Modules/Talents/SavageRoarUptime';
import MoonfireUptime from './Modules/Talents/MoonfireUptime';
import SavageRoarDmg from './Modules/Talents/SavageRoarDmg';

import AshamanesRip from './Modules/Traits/AshamanesRip';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // FeralCore
    damageDone: [DamageDone, { showStatistic: true }],

    // Features
    alwaysBeCasting: AlwaysBeCasting,
    abilities: Abilities,
    cooldownThroughputTracker: CooldownThroughputTracker,
    ferociousBiteEnergy: FerociousBiteEnergy,

    // bleeds
    rakeUptime: RakeUptime,
    ripUptime: RipUptime,

    // talents
    savageRoarUptime: SavageRoarUptime,
    moonfireUptime: MoonfireUptime,
    savageRoarDmg: SavageRoarDmg,

    // resources
    comboPointTracker: ComboPointTracker,
    comboPointDetails: ComboPointDetails,
    energyTracker: EnergyTracker,
    energyDetails: EnergyDetails,

    // traits
    ashamanesRip: AshamanesRip,
  };
}

export default CombatLogParser;
