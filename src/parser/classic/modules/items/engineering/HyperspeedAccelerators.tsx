import Abilities from 'parser/core/modules/Abilities';
import Analyzer, { Options } from 'parser/core/Analyzer';
import GEAR_SLOTS from 'game/GEAR_SLOTS';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';
import SPELLS from 'common/SPELLS/classic/engineering';

export default class HyperspeedAccelerators extends Analyzer.withDependencies({
  abilities: Abilities,
}) {
  constructor(options: Options) {
    super(options);

    const combatant = this.selectedCombatant;
    const gloves = combatant._getGearItemBySlotId(GEAR_SLOTS.HANDS);
    this.active = gloves.onUseEnchant === SPELLS.HYPERSPEED_ACCELERATION.enchantId;

    if (this.active) {
      this.deps.abilities.add({
        spell: SPELLS.HYPERSPEED_ACCELERATION.id,
        category: SPELL_CATEGORY.ITEMS,
        cooldown: 60,
        gcd: null,
      });
    }
  }
}
