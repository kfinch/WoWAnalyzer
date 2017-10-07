import Module from 'Parser/Core/Module';
import SPELLS from 'common/SPELLS';
import Combatants from 'Parser/Core/Modules/Combatants';
import HealingValue from 'Parser/Core/Modules/HealingValue';
import calculateEffectiveHealing from 'Parser/Core/calculateEffectiveHealing';

import { getSpellInfo, HEAL_INFO } from '../Core/SpellInfo';

// TODO add handling for buff strength reliant on item ilevel
const STAT_BUFFS = {
  // int buffs
  // TODO flask, concordance... need (combatant => ...) for concordance?

  // crit buffs

  // haste buffs

  // mastery buffs
  [SPELLS.ASTRAL_HARMONY.id]: { mastery: 4000 },
  [SPELLS.JACINS_RUSE.id]: { mastery: 3000 },

  // vers buffs

  // multi buffs
}

/*
 * A handler for tracking the player's current stat ratings.
 * WCL only provides a snapshot of the player's stats when an encounter begins,
 * and buff events don't actually include if / by how much stats change,
 * so a hardcoded list showing how buffs change stats is required.
 *
 * This module could easily be core, but for now I'm just implementing for Resto Druids -sref
 */
// TODO if adding this as core module, should also track agility and strength
class PlayerStatTracker extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  _stats = {};

  on_initialized() {
    this._stats = {
      int: combatants.selected.intellect,
      crit: combatants.selected.critRating,
      haste: combatants.selected.hasteRating,
      mastery: combatants.selected.masteryRating,
      vers: combatants.selected.versatilityRating,
    }
  }

  get currentInt() {
    return _stats.int;
  }

  get currentCrit() {
    return _stats.crit;
  }

  get currentHaste() {
    return _stats.haste;
  }

  get currentMastery() {
    return _stats.mastery;
  }

  get currentVers() {
    return _stats.vers;
  }

  // TODO add correct handling for stacking buffs (not yet a bug because no stacking buffs in buff list yet)
  on_toPlayer_applybuff(event) {
    const statBuff = STAT_BUFFS[event.ability.guid];
    if(statBuff) {
      _addStats(this._stats, statBuff);
    }
  }

  on_toPlayer_removebuff(event) {
    const statBuff = STAT_BUFFS[event.ability.guid];
    if(statBuff) {
      _subtractStats(this._stats, statBuff);
    }
  }

  _addStats(orig, add) {
    orig.int += (add.int || 0);
    orig.crit += (add.crit || 0);
    orig.haste += (add.haste || 0);
    orig.mastery += (add.mastery || 0);
    orig.vers += (add.vers || 0);
  }

  _subtractStats(orig, subtract) {
    orig.int -= (subtract.int || 0);
    orig.crit -= (subtract.crit || 0);
    orig.haste -= (subtract.haste || 0);
    orig.mastery -= (subtract.mastery || 0);
    orig.vers -= (subtract.vers || 0);
  }

}

export default PlayerStatTracker;
