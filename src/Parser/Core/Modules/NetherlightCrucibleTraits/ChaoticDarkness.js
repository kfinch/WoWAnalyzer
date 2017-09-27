import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';
import HealingDone from 'Parser/Core/Modules/HealingDone';

/**
 * Chaotic Darkness
 * Your spells and abilities have a chance to deal 60000 to 300000 Shadow damage and heal you for 60000 to 300000.
 */
class ChaoticDarkness extends Module {
  static dependencies = {
    combatants: Combatants,
    healingDone: HealingDone,
  };

  damage = 0;

  on_initialized() {
    this.active = this.combatants.selected.traitsBySpellId[SPELLS.CHAOTIC_DARKNESS_TRAIT.id] > 0;
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;

    if (spellId !== SPELLS.CHAOTIC_DARKNESS_DAMAGE.id){
      return;
    }

    this.damage += (event.amount || 0) + (event.absorbed || 0) + (event.overkill || 0);
  }
  subStatistic() {
    const healing = this.healingDone.byAbility(SPELLS.CHAOTIC_DARKNESS_HEALING.id).effective;

    return (
      <div className="flex">
        <div className="flex-main">
          <SpellLink id={SPELLS.CHAOTIC_DARKNESS_TRAIT.id}>
            <SpellIcon id={SPELLS.CHAOTIC_DARKNESS_TRAIT.id} noLink /> Chaotic Darkness
          </SpellLink>
        </div>
        <div className="flex-sub text-right">
        {formatPercentage(this.owner.getPercentageOfTotalHealingDone(healing))} % healing<br />
        {formatPercentage(this.owner.getPercentageOfTotalDamageDone(this.damage))} % damage
        </div>
      </div>
    );
  }
}

export default ChaoticDarkness;
