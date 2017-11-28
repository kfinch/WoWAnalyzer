import SPELLS from 'common/SPELLS';
import Combatants from 'Parser/Core/Modules/Combatants';
import Analyzer from 'Parser/Core/Analyzer';
import HIT_TYPES from 'Parser/Core/HIT_TYPES';
import SpellUsable from 'Parser/Core/Modules/SpellUsable';

const RESET_CDS = [
	SPELLS.ICE_BLOCK.id,
	SPELLS.ICE_BARRIER.id,
	SPELLS.CONE_OF_COLD.id,
	SPELLS.FROST_NOVA.id,
]

class ColdSnap extends Analyzer {

	static dependencies = {
		combatants: Combatants,
		spellUsable: SpellUsable,
	}

  on_byPlayer_cast(event) {
		if (event.ability.guid === SPELLS.COLD_SNAP.id) {
			RESET_CDS.forEach(cooldownId => {
				if (this.spellUsable.isOnCooldown(cooldownId)) {
					this.spellUsable.resetCooldown(cooldownId);
				}
			});
		}
	}
}

export default ColdSnap;
