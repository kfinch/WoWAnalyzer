import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellIcon } from 'interface';
import Analyzer, { Options } from 'parser/core/Analyzer';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import BoringValue from 'parser/ui/BoringValueText';
import ItemPercentHealingDone from 'parser/ui/ItemPercentHealingDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import React from 'react';

import AdaptiveSwarm from '@wowanalyzer/druid/src/shadowlands/covenants/AdaptiveSwarm';

import AdaptiveSwarmResto from '../covenants/AdaptiveSwarmResto';

/**
 * Resto's display module for Evolved Swarm.
 */
class EvolvedSwarmResto extends Analyzer {
  static dependencies = {
    adaptiveSwarmResto: AdaptiveSwarmResto,
  };

  protected adaptiveSwarmResto!: AdaptiveSwarm;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasConduitBySpellID(SPELLS.EVOLVED_SWARM.id);
  }

  // All the actual calculations are centralized in AdaptiveSwarm,
  // this class is just here for the extra statistic box.
  statistic(): React.ReactNode {
    return (
      <Statistic
        size="flexible"
        position={STATISTIC_ORDER.OPTIONAL(0)}
        category={STATISTIC_CATEGORY.COVENANTS}
        tooltip={
          <>
            This is the healing attributable specifically to Evolved Swarm's boost to Adaptive
            Swarm. Note that healing represented here is also being counted in Adaptive Swarm's
            statistic box.
          </>
        }
      >
        <BoringSpellValueText spell={SPELLS.EVOLVED_SWARM}>
          <ItemPercentHealingDone amount={this.adaptiveSwarmResto.evolvedSwarmHealing} />
          <br />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default EvolvedSwarmResto;
