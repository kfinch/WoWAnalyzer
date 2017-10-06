import React from 'react';
import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';
import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import { formatNumber } from 'common/format';

import getDamageBonus from '../../WarlockCore/getDamageBonus';

const LESSONS_OF_SPACETIME_DAMAGE_BONUS = 0.1;

class LessonsOfSpaceTime extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  bonusDmg = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasShoulder(ITEMS.LESSONS_OF_SPACETIME.id);
  }

  on_byPlayer_damage(event) {
    if (this.combatants.selected.hasBuff(SPELLS.LESSONS_OF_SPACETIME_BUFF.id, event.timestamp)) {
      this.bonusDmg += getDamageBonus(event, LESSONS_OF_SPACETIME_DAMAGE_BONUS);
    }
  }

  on_byPlayerPet_damage(event) {
    if (this.combatants.selected.hasBuff(SPELLS.LESSONS_OF_SPACETIME_BUFF.id, event.timestamp)) {
      this.bonusDmg += getDamageBonus(event, LESSONS_OF_SPACETIME_DAMAGE_BONUS);
    }
  }

  item() {
    return {
      item: ITEMS.LESSONS_OF_SPACETIME,
      result: (
        <dfn data-tip={`Total bonus damage contributed: ${formatNumber(this.bonusDmg)}`}>
          {this.owner.formatItemDamageDone(this.bonusDmg)}
        </dfn>
      ),
    };
  }
}

export default LessonsOfSpaceTime;
