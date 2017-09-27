import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';
import HealingDone from 'Parser/Core/Modules/HealingDone';

/**
 * Shadowbind
 * Your spells and abilities have a chance to deal 200000 Shadow damage and heal you for the same amount.
 */
class Shadowbind extends Module {
  static dependencies = {
    combatants: Combatants,
    healingDone: HealingDone,
  };

  damage = 0;

  on_initialized() {
    this.active = this.combatants.selected.traitsBySpellId[SPELLS.SHADOWBIND_TRAIT.id] > 0;
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;

    if (spellId !== SPELLS.SHADOWBIND_DAMAGE_HEALING.id){
      return;
    }

    this.damage += (event.amount || 0) + (event.absorbed || 0) + (event.overkill || 0);
  }
  subStatistic() {
    const healing = this.healingDone.byAbility(SPELLS.SHADOWBIND_DAMAGE_HEALING.id).effective;

    return (
      <div className="flex">
        <div className="flex-main">
          <SpellLink id={SPELLS.SHADOWBIND_TRAIT.id}>
            <SpellIcon id={SPELLS.SHADOWBIND_TRAIT.id} noLink /> Shadowbind
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

export default Shadowbind;
