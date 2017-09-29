import React from 'react';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';

const CALL_DREADSTALKERS_COOLDOWN = 15000;

class T20_2set extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  _expectedCooldownEnd = null;
  procs = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasBuff(SPELLS.WARLOCK_DEMO_T20_2P_BONUS.id);
  }

  on_byPlayer_cast(event) {
    if (event.ability.guid !== SPELLS.CALL_DREADSTALKERS.id) {
      return;
    }
    if (this._expectedCooldownEnd && event.timestamp < this._expectedCooldownEnd) {
      this.procs += 1;
    }
    this._expectedCooldownEnd = event.timestamp + CALL_DREADSTALKERS_COOLDOWN;
  }

  item() {
    return {
      id: `spell-${SPELLS.WARLOCK_DEMO_T20_2P_BONUS.id}`,
      icon: <SpellIcon id={SPELLS.WARLOCK_DEMO_T20_2P_BONUS.id} />,
      title: <SpellLink id={SPELLS.WARLOCK_DEMO_T20_2P_BONUS.id} />,
      result: <span>{this.procs} resets of <SpellLink id={SPELLS.CALL_DREADSTALKERS.id} /> cooldown.</span>,
    };
  }
}

export default T20_2set;
