import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import { calculateSecondaryStatDefault } from 'common/stats';
import { formatPercentage } from 'common/format';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';

const debug = false;

class Haste extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  // It would be nice to have this point to a value in the Combatant class, but that would be tricky since this is `static`.
  static HASTE_RATING_PER_PERCENT = 37500;
  // TODO: Maybe extract "time" changing abilities since they also scale the minimum GCD cap? Probably better to dive into the tooltips to find out how the stat that does that is actually called. Spell Haste, Casting Speed, Attack Speed, Haste, ... are all different variants that look like Haste but act different.
  // TODO: Support time freeze kinda effects, like Elisande's Time Stop or unavoidable stuns?
  /* eslint-disable no-useless-computed-key */
  static HASTE_BUFFS = {
    [SPELLS.BLOODLUST.id]: 0.3,
    [SPELLS.HEROISM.id]: 0.3,
    [SPELLS.TIME_WARP.id]: 0.3,
    [SPELLS.ANCIENT_HYSTERIA.id]: 0.3, // Hunter pet BL
    [SPELLS.NETHERWINDS.id]: 0.3, // Hunter pet BL
    [SPELLS.DRUMS_OF_FURY.id]: 0.25,
    [SPELLS.DRUMS_OF_THE_MOUNTAIN.id]: 0.25,
    [SPELLS.DRUMS_OF_RAGE.id]: 0.25,
    [SPELLS.HOLY_AVENGER_TALENT.id]: 0.3,
    [SPELLS.BERSERKING.id]: 0.15,
    [202842]: 0.1, // Rapid Innervation (Balance Druid trait increasing Haste from Innervate)
    [SPELLS.POWER_INFUSION_TALENT.id]: 0.25,
    [240673]: 800 / 37500, // Shadow Priest artifact trait that's shared with 4 allies: http://www.wowhead.com/spell=240673/mind-quickening
    [SPELLS.MARK_OF_THE_CLAW.id]: 1000 / 37500,
    [SPELLS.WARLOCK_AFFLI_T20_4P_BUFF.id]: 0.15,
    [SPELLS.WARLOCK_DEMO_T20_4P_BUFF.id]: 0.1,
    [SPELLS.TRUESHOT.id]: 0.4, // MM Hunter main CD
    [SPELLS.LINGERING_INSANITY.id]: 0.01,
    [SPELLS.VOIDFORM_BUFF.id]: 0.01,

    // Boss abilities:
    [209166]: 0.3, // DEBUFF - Fast Time from Elisande
    [209165]: -0.3, // DEBUFF - Slow Time from Elisande
    // [208944]: -Infinity, // DEBUFF - Time Stop from Elisande
    [SPELLS.BONE_SHIELD.id]: 0.1, // Blood BK haste buff from maintaining boneshield

    [SPELLS.RISING_TIDES.id]: {
      itemId: ITEMS.CHARM_OF_THE_RISING_TIDE.id,
      hastePerStack: (_, item) => calculateSecondaryStatDefault(900, 576, item.itemLevel) / 37500,
    },
  };

  current = null;
  on_initialized() {
    const combatant = this.combatants.selected;
    this.current = combatant.hastePercentage;

    this._triggerChangeHaste(null, null, this.current, null, combatant.hastePercentage);

    if (this.combatants.selected.hasFinger(ITEMS.SEPHUZS_SECRET.id)) {
      // Sephuz Secret provides a 2% Haste gain on top of its secondary stats
      this._applyHasteGain(null, 0.02);
    }

    // TODO: Determine whether buffs in combatants are already included in Haste. This may be the case for actual Haste buffs, but what about Spell Haste like the Whispers trinket?

    debug && console.log(`Haste: Starting haste: ${formatPercentage(this.current)}%`);
  }
  on_toPlayer_applybuff(event) {
    this._applyActiveBuff(event);
  }
  on_toPlayer_changebuffstack(event) {
    this._changeBuffStack(event);
  }
  on_toPlayer_removebuff(event) {
    this._removeActiveBuff(event);
  }
  on_toPlayer_applydebuff(event) {
    this._applyActiveBuff(event);
  }
  on_toPlayer_changedebuffstack(event) {
    this._changeBuffStack(event);
  }
  on_toPlayer_removedebuff(event) {
    this._removeActiveBuff(event);
  }


  _applyActiveBuff(event) {
    const spellId = event.ability.guid;
    const hasteGain = this._getBaseHasteGain(spellId);

    if (hasteGain) {
      this._applyHasteGain(event, hasteGain);

      debug && console.log(`Haste: Current haste: ${formatPercentage(this.current)}% (gained ${formatPercentage(hasteGain)}% from ${SPELLS[spellId] ? SPELLS[spellId].name : spellId})`);
    }
  }
  _removeActiveBuff(event) {
    const spellId = event.ability.guid;
    const haste = this._getBaseHasteGain(spellId);

    if (haste) {
      this._applyHasteLoss(event, haste);

      debug && console.log(`Haste: Current haste: ${formatPercentage(this.current)}% (lost ${formatPercentage(haste)}% from ${SPELLS[spellId] ? SPELLS[spellId].name : spellId})`);
    }
  }
  /**
   * Gets the base Haste gain for the provided spell.
   */
  _getBaseHasteGain(spellId) {
    const hasteBuff = this.constructor.HASTE_BUFFS[spellId] || undefined;

    if (typeof hasteBuff === 'number') {
      // A regular number is a static Haste percentage
      return hasteBuff;
    } else if (typeof hasteBuff === 'object') {
      // An object can provide more info
      if (hasteBuff.haste) {
        return this._getHasteValue(hasteBuff.haste, hasteBuff);
      }
    }
    return null;
  }

  _changeBuffStack(event) {
    const spellId = event.ability.guid;
    const haste = this._getHastePerStackGain(spellId);

    if (haste) {
      // Haste stacks are usually additive, so at 5 stacks with 3% per you'd be at 15%, 6 stacks = 18%. This means the only right way to add a Haste stack is to reset to Haste without the old total and then add the new total Haste again.
      this._applyHasteLoss(event, haste * event.oldStacks);
      this._applyHasteGain(event, haste * event.newStacks);

      debug && console.log(`Haste: Current haste: ${formatPercentage(this.current)}% (gained ${formatPercentage(haste * event.stacksGained)}% from ${SPELLS[spellId] ? SPELLS[spellId].name : spellId})`);
    }
  }
  _getHastePerStackGain(spellId) {
    const hasteBuff = this.constructor.HASTE_BUFFS[spellId] || undefined;

    if (typeof hasteBuff === 'number') {
      // hasteBuff being a number is shorthand for static haste only
    } else if (typeof hasteBuff === 'object') {
      if (hasteBuff.hastePerStack) {
        return this._getHasteValue(hasteBuff.hastePerStack, hasteBuff);
      }
    }
    return null;
  }
  /**
   * Get the actual Haste value from a prop allowing various formats.
   */
  _getHasteValue(value, hasteBuff) {
    const { itemId } = hasteBuff;
    if (typeof value === 'function') {
      const selectedCombatant = this.combatants.selected;
      let itemDetails;
      if (itemId) {
        itemDetails = selectedCombatant.getItem(itemId);
        if (!itemDetails) {
          console.error('Failed to retrieve item information for item with ID:', itemId);
        }
      }
      return value(selectedCombatant, itemDetails);
    }
    return value;
  }

  _applyHasteGain(event, haste) {
    const oldHaste = this.current;
    this.current = this.constructor.addHaste(this.current, haste);

    this._triggerChangeHaste(event, oldHaste, this.current, haste, null);
  }
  _applyHasteLoss(event, haste) {
    const oldHaste = this.current;
    this.current = this.constructor.removeHaste(this.current, haste);

    this._triggerChangeHaste(event, oldHaste, this.current, null, haste);
  }
  _triggerChangeHaste(event, oldHaste, newHaste, hasteGain, hasteLoss) {
    this.owner.triggerEvent('changehaste', {
      timestamp: event ? event.timestamp : this.owner.currentTimestamp,
      type: 'changehaste',
      sourceID: event ? event.sourceID : this.owner.playerId,
      targetID: this.owner.playerId,
      reason: event,
      oldHaste,
      newHaste,
      hasteGain,
      hasteLoss,
    });
  }

  static addHaste(baseHaste, hasteGain) {
    return baseHaste * (1 + hasteGain) + hasteGain;
  }
  static removeHaste(baseHaste, hasteLoss) {
    return (baseHaste - hasteLoss) / (1 + hasteLoss);
  }
}

export default Haste;
