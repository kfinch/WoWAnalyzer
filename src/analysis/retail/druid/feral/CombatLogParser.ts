import ActiveDruidForm from 'analysis/retail/druid/shared/core/ActiveDruidForm';
import DraughtOfDeepFocus from 'analysis/retail/druid/shared/spells/DraughtOfDeepFocus';
import RavenousFrenzy from 'analysis/retail/druid/shared/spells/RavenousFrenzy';
import CoreCombatLogParser from 'parser/core/CombatLogParser';

import Abilities from './modules/Abilities';
import RakeUptimeAndSnapshots from 'analysis/retail/druid/feral/modules/features/RakeUptimeAndSnapshots';
import RipUptimeAndSnapshots from 'analysis/retail/druid/feral/modules/features/RipUptimeAndSnapshots';
import Buffs from './modules/Buffs';
import ComboPointDetails from 'analysis/retail/druid/feral/modules/core/combopoints/ComboPointDetails';
import ComboPointTracker from 'analysis/retail/druid/feral/modules/core/combopoints/ComboPointTracker';
import FinisherUse from 'analysis/retail/druid/feral/modules/features/FinisherUse';
import DotUptimesAndSnapshots from 'analysis/retail/druid/feral/modules/features/DotUptimesAndSnapshots';
import AlwaysBeCasting from './modules/features/AlwaysBeCasting';
import Checklist from './modules/checklist/Module';
import CooldownThroughputTracker from './modules/features/CooldownThroughputTracker';
import EnergyDetails from 'analysis/retail/druid/feral/modules/core/energy/EnergyDetails';
import EnergyGraph from 'analysis/retail/druid/feral/modules/core/energy/EnergyGraph';
import EnergyTracker from 'analysis/retail/druid/feral/modules/core/energy/EnergyTracker';
import SpellEnergyCost from 'analysis/retail/druid/feral/modules/core/energy/SpellEnergyCost';
import SpellUsable from './modules/features/SpellUsable';
import AdaptiveSwarmFeral from 'analysis/retail/druid/feral/modules/spells/AdaptiveSwarmFeral';
import ApexPredatorsCraving from 'analysis/retail/druid/feral/modules/spells/ApexPredatorsCraving';
import ConvokeSpiritsFeral from 'analysis/retail/druid/feral/modules/spells/ConvokeSpiritsFeral';
import BerserkBoosts from './modules/spells/BerserkBoosts';
import FerociousBite from './modules/spells/FerociousBite';
import HitCountAoE from './modules/spells/HitCountAoE';
import TigersFuryEnergy from './modules/spells/TigersFuryEnergy';
import Bloodtalons from 'analysis/retail/druid/feral/modules/spells/Bloodtalons';
import MoonfireUptimeAndSnapshots from 'analysis/retail/druid/feral/modules/features/MoonfireUptimeAndSnapshots';
import CastLinkNormalizer from './normalizers/CastLinkNormalizer';
import FerociousBiteDrainLinkNormalizer from './normalizers/FerociousBiteDrainLinkNormalizer';
import RakeBleed from './normalizers/RakeBleed';
import Guide from 'analysis/retail/druid/feral/Guide';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Normalizers
    rakeBleed: RakeBleed,
    castLinkNormalizer: CastLinkNormalizer,
    ferociousBiteDrainLinkNormalizer: FerociousBiteDrainLinkNormalizer,

    // Core
    activeDruidForm: ActiveDruidForm,
    spellEnergyCost: SpellEnergyCost,

    // Features
    alwaysBeCasting: AlwaysBeCasting,
    abilities: Abilities,
    buffs: Buffs,
    cooldownThroughputTracker: CooldownThroughputTracker,
    dotUptimesAndSnapshots: DotUptimesAndSnapshots,
    ferociousBite: FerociousBite,
    spellUsable: SpellUsable,
    energyTracker: EnergyTracker,
    energyDetails: EnergyDetails,
    energyGraph: EnergyGraph,
    checklist: Checklist,

    // bleeds
    rakeUptime: RakeUptimeAndSnapshots,
    ripUptime: RipUptimeAndSnapshots,

    // spells
    tigersFuryEnergy: TigersFuryEnergy,
    hitCountAoe: HitCountAoE,

    // talents
    moonfireUptime: MoonfireUptimeAndSnapshots,
    bloodtalons: Bloodtalons,
    apexPredatorsCraving: ApexPredatorsCraving,
    convokeSpirits: ConvokeSpiritsFeral,
    draughtOfDeepFocus: DraughtOfDeepFocus,
    adaptiveSwarm: AdaptiveSwarmFeral,
    ravenousFrenzy: RavenousFrenzy,
    berserkBoosts: BerserkBoosts,

    // resources
    comboPointTracker: ComboPointTracker,
    comboPointDetails: ComboPointDetails,
    finisherUse: FinisherUse,
  };

  static guide = Guide;
}

export default CombatLogParser;
