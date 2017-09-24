import React from 'react';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';
import calculateEffectiveHealing from 'Parser/Core/calculateEffectiveHealing';
import SPELLS from 'common/SPELLS';

import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';
import { getSpellInfo } from '../Core/SpellInfo';


const GROVEWALKER_HEALING_INCREASE = 0.01;

/**
 * Grovewalker (Artifact Trait)
 * Increases all healing over time you do by 1%
 */
class Grovewalker extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  rank = 0;
  healing = 0;

  on_initialized() {
    this.rank = this.combatants.selected.traitsBySpellId[SPELLS.GROVEWALKER.id];
    this.active = this.rank > 0;
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    if(!getSpellInfo(spellId).masteryStack || (SPELLS.REGROWTH.id === spellId && !event.tick)) {
      return;
    }

    this.healing += calculateEffectiveHealing(event, GROVEWALKER_HEALING_INCREASE * this.rank) / this.rank;
  }

  subStatistic() {
    return (
      <div className="flex">
        <div className="flex-main">
          <SpellLink id={SPELLS.GROVEWALKER.id}>
            <SpellIcon id={SPELLS.GROVEWALKER.id} noLink /> Grovewalker
          </SpellLink>
        </div>
        <div className="flex-sub text-right">
          {formatPercentage(this.owner.getPercentageOfTotalHealingDone(this.healing))} %
        </div>
      </div>
    );
  }
}

export default Grovewalker;
