import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';

/*
 * This is an 'abstract' implementation of a framework for tracking resource generating/spending.
 * Extend it by following the instructions in the TODO comments below
 */
class ResourceTracker extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };

  current = 0;

  // stores resource building abilities by ID, with info on generated / wasted /casts
  buildersObj = {};
  // stores resource spending abilities by ID, with info on spent / casts
  spendersObj = {};

  // TODO set this to the resource you wish to track on_initialized.. see the appropriate objects in common/RESOURCE_TYPES
  resource;

  // TODO a classes 'main' resource passes the max along with events, but for other resources this may need to be defined
  maxResource;

  // TODO if you wish an ability to show in results even if it wasn't used, add it using these functions on_initialized
  initBuilderAbility(spellId) {
    this.buildersObj[spellId] = { generated: 0, wasted: 0, casts: 0 };
  }
  initSpenderAbility(spellId) {
    this.spendersObj[spellId] = { spent: 0, spentByCast: [], casts: 0 };
  }

  // BUILDERS - Handled on energize, using the 'resourceChange' field
  on_toPlayer_energize(event) {
    const spellId = event.ability.guid;

    if(event.resourceChangeType !== this.resource.id) {
        return;
    }

    const waste = event.waste;
    const gain = event.resourceChange - waste;
    this._applyBuilder(spellId, this.getResource(event), gain, waste);
  }

  _applyBuilder(spellId, resource, gain, waste) {
    if (!(spellId in this.buildersObj)) {
        this.initBuilderAbility(spellId);
    }

    this.buildersObj[spellId].wasted += waste;
    this.buildersObj[spellId].generated += gain;
    this.buildersObj[spellId].casts += 1;

    // resource.amount for an energize is the amount AFTER the energize
    if (!!resource && resource.amount !== undefined) {
      this.current = resource.amount;
      if (resource.max !== undefined) {
        this.maxResource = resource.max; // track changes in max resource, which can happen due to procs / casts
      }
    } else {
      this.current += gain;
    }
  }

  // FIXME Track resource drains too, so that the 'current' value can be more accurate

  // TODO if an event should have an associated energize but doesn't, fabricate it by calling this
  /**
   * Triggers an energize event of the tracked resource type.
   * Automatically fills in all the fields except the raw gain amount.
   * @param {object} event - The event triggering the resource gain
   * @param {number} amount - The raw amount of resources to gain
   */
  processInvisibleEnergize(event, amount) {
    const maxGain = this.maxResource !== undefined ? this.maxResource - this.current : amount;
    const waste = Math.max(amount - maxGain, 0);

    this.owner.triggerEvent('energize', {
      timestamp: event.timestamp,
      type: 'energize',
      ability: event.ability,
      sourceID: event.sourceID,
      sourceIsFriendly: event.sourceIsFriendly,
      targetID: this.owner.playerId,
      targetIsFriendly: true,
      resourceChange: amount,
      resourceChangeType: this.resource.id,
      waste,
      __fabricated: true,
    });
  }

  // SPENDERS - Handled on cast, using the 'classResources' field
  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;

    if(!this.shouldProcessCastEvent(event)) {
        return;
    }
    const eventResource = this.getResource(event);
    if (eventResource && eventResource.max) {
      this.maxResource = eventResource.max; // track changes in max resource, which can happen due to procs / casts
    }
    const cost = this.getReducedCost(event);

    if (!(spellId in this.spendersObj)) {
      this.initSpenderAbility(spellId);
    }

    if (!cost || cost === 0) {
      return;
    }

    this.spendersObj[spellId].casts += 1;
    this.spendersObj[spellId].spentByCast.push(cost);
    if(cost > 0)
    {
      this.spendersObj[spellId].spent += cost;
    }

    //Re-sync current amount, to update not-tracked gains.
    this.current = eventResource.amount - cost;

    this.triggerSpendEvent(cost, event);
  }

  // TODO if your spec has an ability cost reduction that doesn't show in events, handle it manually by overriding here
  getReducedCost(event) {
    return this.getResource(event).cost;
  }

  getResource(event) {
    if(!event.classResources) {
      return null;
    } else {
      return event.classResources.find(r => r.type === this.resource.id) || null;
    }
  }

  triggerSpendEvent(spent, event) {
    this.owner.triggerEvent('spendresource', {
      timestamp: event.timestamp,
      type: 'spendresource',
      sourceID: event.sourceID,
      targetID: event.targetID,
      reason: event,
      resourceChange: spent,
      resourceChangeType: this.resource.id,
      ability: event.ability,
    });
  }

  shouldProcessCastEvent(event) {
    return !!this.getResource(event);
  }

  get generated() {
    return Object.values(this.buildersObj).reduce((acc, spell) => acc + spell.generated, 0);
  }

  get wasted() {
    return Object.values(this.buildersObj).reduce((acc, spell) => acc + spell.wasted, 0);
  }

  get spent() {
    return Object.values(this.spendersObj).reduce((acc, spell) => acc + spell.spent, 0);
  }

  get spendersCasts() {
    return Object.values(this.spendersObj).reduce((acc, spell) => acc + spell.casts, 0);
  }
}

export default ResourceTracker;
