import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';
import Haste from 'Parser/Core/Modules/Haste';
import ResourceTracker from './ResourceTracker';

const debug = true;

/*
 * This is an extension of ResourceTracker that also handles a resource 'naturally regenrating' e.g. Energy / Focus / Runes.
 *
 * Current resource amounts are constantly reported when resource are spent or artificially generated, so we use these reports as benchmarks,
 * and then extrapolate the expected resource amount from there. If this extrapolation results in an expected overcap, that wasted amount is tracked.
 */
 // FIXME find out how energy regen stacks (additive vs multiplicative, buff vs haste)
class RegeneratingResourceTracker extends ResourceTracker {
  static dependencies = {
    combatants: Combatants,
    haste: Haste,
  };

  // FIXME integrate naturalRegen information into ResourceChart

  lastCheck;

  // FIXME apply rounding before populating here?
  naturalRegen = { generated: 0, wasted: 0 };

  // TODO the resource's regeneration rate, in units per second
  baseRegenRate;
  // TODO iff true, the resource's regeneration rate will be scaled up with haste
  isRegenHasted;

  // These are for tracking the state of regen buffs
  _multiplier = 1;
  _regenBuffs = {};

  on_initialized() {
    // FIXME throw an error if this.maxResource isn't defined
  }

  /**
   * Register a buff ID as a resource regeneration multiplier.
   * When the buff is applied, the given multiplier is applied to the current regen rate.
   * When the buff is removed, the multiplier is removed from the current regen rate.
   */
  registerRegenBuff(spellId, multiplier) {
    // FIXME throw error if already registered?
    // FIXME this won't work if stacking additive
    this._regenBuffs[spellId] = multiplier;
  }

  /**
   * Register a permanent change to resource regeneration (e.g. a Talent or Item's passive buff).
   * This does basically the same thing as changing the baseRegenRate.
   */
  applyRegenMultiplier(multiplier) {
    // FIXME throw error if zero or undefined?
    this._multiplier *= multiplier;
  }

  // apply / remove regeneration modifying buffs
  on_toPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (this._regenBuffs[spellId] !== undefined) {
      this._multiplier *= this._regenBuffs[spellId];
    }
    const newAmount = this._tallyNaturalRegen();
    this._updateLastCheck(event.timestamp, newAmount);
  }
  on_toPlayer_removebuff(event) {
    const spellId = event.ability.guid;
    if (this._regenBuffs[spellId] !== undefined) {
      this._multiplier /= this._regenBuffs[spellId];
    }
    const newAmount = this._tallyNaturalRegen();
    this._updateLastCheck(event.timestamp, newAmount);
  }

  // The classResources field refers to either the target or the source, depending on event type,
  // hence some of these are 'byPlayer' and others 'toPlayer'
  on_byPlayer_cast(event) {
    this._findAndHandleClassResource(event);
  }
  on_toPlayer_heal(event) {
    this._findAndHandleClassResource(event);
  }
  on_toPlayer_damage(event) {
    this._findAndHandleClassResource(event);
  }
  on_toPlayer_energize(event) {
    this._findAndHandleClassResource(event);
  }
  _findAndHandleClassResource(event) {
    const classResource = this.getResource(event);
    if (!classResource || !classResource.amount) {
      return;
    }

    const expectedCurrentAmount = this._tallyNaturalRegen();
    const actualCurrentAmount = classResource.amount;
    // FIXME log / error check difference?
    this._updateLastCheck(event.timestamp, actualCurrentAmount);
  }

  on_spendresource(event) {
    if (event.resourceChangeType !== this.resource.id) {
      return;
    }
    const beforeSpendAmount = this._tallyNaturalRegen();
    let afterSpendAmount = beforeSpendAmount - event.resourceChange;
    if (afterSpendAmount < 0) {
      // FIXME log error
      afterSpendAmount = 0;
    }
    this._updateLastCheck(event.timestamp, afterSpendAmount);
  }

  on_changehaste(event) {
    const newAmount = this._tallyNaturalRegen();
    this._updateLastCheck(event.timestamp, newAmount);
  }

  _updateLastCheck(timestamp, amount) {
    if (amount !== null) {
      this.lastCheck = {
        timestamp,
        amount,
        rate: this.currentRegenRate,
      };
    }
  }

  /**
   * Tallies the expected natural regeneration that occured since the last resource check.
   * Adds to the 'generated' and 'wasted' fields in naturalRegen appropriately.
   * @returns {number} The expected resource amount at the current timestamp, or null if there was no last check.
   */
  _tallyNaturalRegen() {
    if (!this.lastCheck) {
      return null;
    }
    const timestamp = this.owner.currentTimestamp;
    const timeSinceLastCheck = timestamp - this.lastCheck.timestamp;
    if (timeSinceLastCheck === 0) {
      return this.lastCheck.amount;
    }

    const expectedGain = this.lastCheck.rate * timeSinceLastCheck / 1000;
    const maxGain = this.maxResource - this.lastCheck.amount;

    const generated = Math.min(expectedGain, maxGain);
    const wasted = Math.max(expectedGain - maxGain, 0);

    this.naturalRegen.generated += generated;
    this.naturalRegen.wasted += wasted;

    return this.lastCheck.amount + generated; // this is the new expected resource amount at the current timestamp
  }

  /** gets resource regeneration rate at the current timestamp, based on state of haste and/or multipliers */
  get currentRegenRate() {
    return this.baseRegenRate * this._multiplier * (this.isRegenHasted ? (1 + this.haste.current) : 1);
  }

  on_finished() {
    debug && console.log(`Natural Regen - generated: ${this.naturalRegen.generated}, wasted: ${this.naturalRegen.wasted}`);
  }

}

export default RegeneratingResourceTracker;
