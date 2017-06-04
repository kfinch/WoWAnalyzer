import Module from 'Parser/Core/Module';
import SPELLS from 'common/SPELLS';
import {MASTERY_BUFFS, ABILITIES_AFFECTED_BY_MASTERY} from '../../Constants';

class SpringBlossom extends Module {
  healing = 0;
  masteryHealing = 0;
  hasTalent = false;
  baseMasteryPercent = 0;
  count = 0;

  on_initialized() {
    if (!this.owner.error) {
      this.hasTalent = this.owner.selectedCombatant.hasTalent(SPELLS.SPRING_BLOSSOMS_TALENT.id);
    }
    this.baseMasteryPercent = this.owner.modules.combatants.selected.masteryPercentage;
    console.log("Mastery percent: " + this.baseMasteryPercent);
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;

    if (SPELLS.SPRING_BLOSSOMS.id === spellId) {
      this.healing += event.amount;
    }

    // Check if player is affected by spring blossoms mastery stack.
    Object.keys(this.owner.combatants.players)
      .map(player => this.owner.combatants.players[player])
      .forEach((player) => {
        if(player.hasBuff(SPELLS.SPRING_BLOSSOMS.id, event.timestamp, 0, 0) === true && player._combatantInfo.sourceID === event.targetID) {
          // Check if player has a dynamic mastery buff.
          let currentMastery = this.baseMasteryPercent;
          Object.keys(MASTERY_BUFFS).forEach((spellId) => {
            if (this.owner.selectedCombatant.hasBuff(spellId)) {
              currentMastery += MASTERY_BUFFS[spellId];
            }
          });
          if (ABILITIES_AFFECTED_BY_MASTERY.indexOf(spellId) !== -1) {
            this.masteryHealing += event.amount - (event.amount/(1+currentMastery/100));

            console.log("Heal: " +  event.ability.name);
            console.log("Amount: " + event.amount);
            console.log("Overheal: " + event.overheal);
            console.log("Current mastery: " + currentMastery);
          }
        }
      });
  }
}

export default SpringBlossom;
