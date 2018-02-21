import RESOURCE_TYPES from 'common/RESOURCE_TYPES';
import Combatants from 'Parser/Core/Modules/Combatants';
import SPELLS from 'common/SPELLS';

import RegeneratingResourceTracker from 'Parser/Core/Modules/ResourceTracker/RegeneratingResourceTracker';

class EnergyTracker extends RegeneratingResourceTracker {
  static dependencies = {
    combatants: Combatants,
  };

  on_initialized() {
    this.resource = RESOURCE_TYPES.ENERGY;

    this.maxResource = 100;
    // FIXME other max resource changes tracked automatically in ResourceTracker?
    // if (this.combatants.selected.hasTalent(SPELLS.MOMENT_OF_CLARITY_TALENT_FERAL.id)) {
    //   this.maxResource += 30;
    // }
    // if (this.combatants.selected.hasRing(ITEMS.CHATOYANT_SIGNET.id)) {
    //   this.maxResource += 100;
    // }
  }

  // FIXME figure out how clearcasts look in events, make sure they're handled correctly
}

export default EnergyTracker;
