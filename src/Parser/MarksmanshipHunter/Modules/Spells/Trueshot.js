import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';
import SPELLS from 'common/SPELLS';

class Trueshot extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  trueShotCDReduction = 0;

  get reducedCooldownWithTraits() {
    const player = this.combatants.selected;
    const quickShotRank = player.traitsBySpellId[SPELLS.QUICK_SHOT_TRAIT.id];

    //Calculates the reduction in cooldown on Trueshot, based upon the rank of the trait Quick Shot. Each rank gives diminishing values, the more ranks you get. Rank 1-3 is 10 each, then each switch case is for the subsequential 4 possibilities.
    if (quickShotRank < 4) {
      this.trueShotCDReduction = quickShotRank * 10;
    }
    else {
      switch(quickShotRank) {
        case 4:
          this.trueShotCDReduction = 38;
          break;
        case 5:
          this.trueShotCDReduction = 45;
          break;
        case 6:
          this.trueShotCDReduction = 52;
          break;
        case 7:
          this.trueShotCDReduction = 58;
          break;
        default:
          break;
      }
    }
    const reducedCooldownWithTraits = 180 - this.trueShotCDReduction;
    return reducedCooldownWithTraits;
  }
}

export default Trueshot;
