import SPELLS from 'common/SPELLS';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import calculateEffectiveHealing from 'parser/core/calculateEffectiveHealing';
import Events, { HealEvent } from 'parser/core/Events';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemPercentHealingDone from 'parser/ui/ItemPercentHealingDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import React from 'react';

const CONFLUX_OF_ELEMENTS_EFFECT_BY_RANK = [
  0,
  15,
  16.5,
  18,
  19.5,
  21,
  22.5,
  24,
  25.5,
  27,
  28.5,
  30,
  31.5,
  33,
  34.5,
  36,
];

/**
 * -- Conflux of Elements --
 * Conduit - Night Fae
 *
 * While channeling Convoke the Spirits, your damage and healing are increased by 15.0%.
 */
class ConfluxOfElements extends Analyzer {
  // a tally of the healing attributable to Conflux of Element's boost on heals.
  _healBoostAttribution: number = 0;
  // the strength of the heal boost, calculated dynamically based on conduit ilvl
  _healBoost: number;

  constructor(options: Options) {
    super(options);

    this.active = this.selectedCombatant.hasConduitBySpellID(SPELLS.CONFLUX_OF_ELEMENTS.id);

    const percentHealBoost =
      CONFLUX_OF_ELEMENTS_EFFECT_BY_RANK[
        this.selectedCombatant.conduitRankBySpellID(SPELLS.CONFLUX_OF_ELEMENTS.id)
      ];
    this._healBoost = percentHealBoost / 100.0;

    this.addEventListener(Events.heal.by(SELECTED_PLAYER), this.onHeal);
  }

  onHeal(event: HealEvent) {
    if (this.selectedCombatant.hasBuff(SPELLS.CONVOKE_SPIRITS.id)) {
      this._healBoostAttribution += calculateEffectiveHealing(event, this._healBoost);
    }
  }

  statistic() {
    return (
      <Statistic
        size="flexible"
        position={STATISTIC_ORDER.OPTIONAL(0)}
        category={STATISTIC_CATEGORY.COVENANTS}
        tooltip={
          <>
            This is the healing attributable to Conflux of Element's boost to healing done during
            Convoke the Spirits.
          </>
        }
      >
        <BoringSpellValueText spell={SPELLS.CONFLUX_OF_ELEMENTS}>
          <ItemPercentHealingDone amount={this._healBoostAttribution} />
          <br />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default ConfluxOfElements;
