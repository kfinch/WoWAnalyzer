import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';
import Haste from 'Parser/Core/Modules/Haste';

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
   * Register a buff ID as a resource regeneration multiplier
   * FIXME more detail
   */
  registerRegenBuff(spellId, multiplier) {
    // FIXME throw error if already registered?
    // FIXME this won't work if stacking additive
    this._regenBuffs[spellId] = multiplier;
  }

  /**
   * Register a permanent change to resource regeneration (e.g. a Talent or Item's passive buff)
   * FIXME more detail
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
  }
  on_toPlayer_removebuff(event) {
    const spellId = event.ability.guid;
    if (this._regenBuffs[spellId] !== undefined) {
      this._multiplier /= this._regenBuffs[spellId];
    }
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
    // FIXME handle
  }

  on_changehaste(event) {
    const newAmount = this._tallyNaturalRegen();
    this._updateLastCheck(event.timestamp, newAmount);
  }

  _updateLastCheck(timestamp, amount) {
    this.lastCheck = {
      timestamp,
      amount,
      rate: this.currentRegenRate,
    };
  }

  _tallyNaturalRegen() {
    if (!this.lastCheck) {
      return null;
    }
    const timestamp = this.owner.currentTimestamp;
    const timeSinceLastCheck = timestamp - this.lastCheck.timestamp;
    if (timeSinceLastCheck === 0) {
      return null;
    }

    const expectedGain = this.lastCheck.rate * timeSinceLastCheck / 1000;
    const maxGain = this.maxResource - this.lastCheck.amount;

    const generated = Math.min(expectedGain, maxGain);
    const wasted = Math.max(expectedGain - maxGain, 0);

    this.naturalRegen.generated += generated;
    this.naturalRegen.wasted += wasted;

    return this.lastCheck.amount + generated; // this is the new expected resource amount at the current timestamp
  }

  get currentRegenRate() {
    return this.baseRegenRate * this._multiplier * (this.isRegenHasted ? (1 + this.haste.current) : 1);
  }

}

export default RegeneratingResourceTracker;
