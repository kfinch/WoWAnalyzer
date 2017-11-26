import SPELLS from 'common/SPELLS';
import Combatants from 'Parser/Core/Modules/Combatants';

import SharedRuneOfPower from '../../../Shared/Modules/Features/RuneOfPower';
import Ignite from '../Core/Ignite';

const DAMAGE_BONUS = 0.4;

class RuneOfPower extends SharedRuneOfPower {

  static dependencies = {
    ...SharedRuneOfPower.dependencies,
    combatants: Combatants,
    ignite: Ignite,
	}

  on_byPlayer_damage(event) {
    if(this.combatants.selected.hasBuff(SPELLS.RUNE_OF_POWER_BUFF.id)) {
      const damageWithIgnite = this.ignite.getDamageWithIgnite(event);
      this.damage += damageWithIgnite * (DAMAGE_BONUS / (1 + DAMAGE_BONUS));
    }
  }

}

export default RuneOfPower;
