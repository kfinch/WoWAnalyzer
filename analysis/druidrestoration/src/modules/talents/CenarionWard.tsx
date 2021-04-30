import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellIcon } from 'interface';
import Analyzer, { Options } from 'parser/core/Analyzer';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import BoringValue from 'parser/ui/BoringValueText';
import ItemPercentHealingDone from 'parser/ui/ItemPercentHealingDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import React from 'react';

import Mastery from '../core/Mastery';

class CenarionWard extends Analyzer {
  static dependencies = {
    mastery: Mastery,
  };

  protected mastery!: Mastery;

  constructor(options: Options) {
    super(options);
    const hasCenarionWard = this.selectedCombatant.hasTalent(SPELLS.CENARION_WARD_TALENT.id);
    this.active = hasCenarionWard;
  }

  statistic() {
    const directHealing = this.mastery.getDirectHealing(SPELLS.CENARION_WARD_HEAL.id);
    const directPercent = this.owner.getPercentageOfTotalHealingDone(directHealing);

    const masteryHealing = this.mastery.getMasteryHealing(SPELLS.CENARION_WARD_HEAL.id);
    const masteryPercent = this.owner.getPercentageOfTotalHealingDone(masteryHealing);

    const totalHealing = directHealing + masteryHealing;
    const totalPercent = directPercent + masteryPercent;

    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(10)}
        size="flexible"
        tooltip={
          <>
            This is the sum of the direct healing from Cenarion Ward and the healing enabled by
            Cenarion Ward's extra mastery stack.
            <ul>
              <li>
                Direct: <strong>{formatPercentage(directPercent)}%</strong>
              </li>
              <li>
                Mastery: <strong>{formatPercentage(masteryPercent)}%</strong>
              </li>
            </ul>
          </>
        }
      >
        <BoringSpellValueText spell={SPELLS.CENARION_WARD_TALENT}>
          <ItemPercentHealingDone amount={totalHealing} />
          <br />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default CenarionWard;
