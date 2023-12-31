import { isConvoking } from 'analysis/retail/druid/shared/spells/ConvokeSpirits';
import SPELLS from 'common/SPELLS';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import { Options } from 'parser/core/Analyzer';
import { ClassResources, ResourceChangeEvent } from 'parser/core/Events';
import ResourceTracker from 'parser/shared/modules/resources/resourcetracker/ResourceTracker';

// Primal Fury may be slightly delayed.
const PRIMAL_FURY_WINDOW = 50; //ms

class ComboPointTracker extends ResourceTracker {
  static dependencies = {
    ...ResourceTracker.dependencies,
  };

  /**
   * A critical hit from a generator triggers Primal Fury which gives an extra combo point.
   * A Feral druid should always build up 5 combo points and crits are unpredictable.
   * Generators used at 4 combo points that crit will waste the Primal Fury generation but
   * this is unavoidable, or at least shouldn't be avoided.
   *
   * Also, Convoke the Spirits is liable to produce more than 5 CPs, and so waste that occurs
   * during Convoke is also unavoidable.
   */
  unavoidableWaste = 0;

  castToMaxCpTimestamp: number | null = null;

  constructor(options: Options) {
    super(options);
    this.resource = RESOURCE_TYPES.COMBO_POINTS;
    this.maxResource = 5;
  }

  getAdjustedGain(event: ResourceChangeEvent): { gain: number; waste: number } {
    if (event.ability.guid === SPELLS.OVERFLOWING_POWER_ENERGIZE.id) {
      /*
       * Overflowing Power is an effect gained during Berserk that allows Feral to 'store'
       * up to 3 combo points over the cap. In practice, the builder shows as CPs wasted paired
       * with a stack gain to Overflowing Power. Then when a finisher is used, OP 'cashs in'
       * for combo point gain equal to the number of stacks. This presents a challenge for tracking
       * CPs because we'll see builder waste that wasn't really waste because it added to the store.
       *
       * The most straightforward way to handle this would be to change wasted CPs that add to
       * OP and call them gained, but this has two potential issues:
       * 1) We are submitting resource change events at the wrong timestamp (on ability use instead of on 'cash in')
       * 2) Those CPs might actually be waste after all, because when Berserk ends the stored CPs go away.
       *
       * We will account for both of those issues
       */
      return { gain: 0, waste: 0 };
    }

    const waste = event.waste;
    const gain = event.resourceChange - waste;
    return { gain, waste };
  }

  _applyBuilder(
    spellId: number,
    gain: number,
    waste: number,
    timestamp: number,
    resource?: ClassResources,
  ) {
    const isMaxBefore = this.current === this.maxResource;
    super._applyBuilder(spellId, gain, waste, timestamp, resource);
    const isMaxAfter = this.current === this.maxResource;

    if (!isMaxBefore && isMaxAfter) {
      this.castToMaxCpTimestamp = this.owner.currentTimestamp;
      return;
    }

    if (isConvoking(this.selectedCombatant)) {
      this.unavoidableWaste += waste;
    } else if (
      spellId === SPELLS.PRIMAL_FURY.id &&
      this.owner.currentTimestamp - (this.castToMaxCpTimestamp || 0) < PRIMAL_FURY_WINDOW
    ) {
      this.unavoidableWaste += 1;
    }
  }
}

export default ComboPointTracker;
