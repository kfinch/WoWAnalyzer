import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';

/**
 * Dark Sorrows
 * Your spells and abilities have a chance to afflict the target with Sorrow, causing it to burst after 8 sec, dealing 133100 Shadow damage.
 */
class DarkSorrows extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  damage = 0;

  on_initialized() {
    this.active = this.combatants.selected.traitsBySpellId[SPELLS.DARK_SORROWS_TRAIT.id] > 0;
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;

    if (spellId !== SPELLS.DARK_SORROWS_DAMAGE.id){
      return;
    }

    this.damage += (event.amount || 0) + (event.absorbed || 0) + (event.overkill || 0);
  }
  
  subStatistic() {
    return (
      <div className="flex">
        <div className="flex-main">
          <SpellLink id={SPELLS.DARK_SORROWS_TRAIT.id}>
            <SpellIcon id={SPELLS.DARK_SORROWS_TRAIT.id} noLink /> Dark Sorrows
          </SpellLink>
        </div>
        <div className="flex-sub text-right">
        Damage: {formatPercentage(this.owner.getPercentageOfTotalDamageDone(this.damage))} % 
        </div>
      </div>
    );
  }
}

export default DarkSorrows;
