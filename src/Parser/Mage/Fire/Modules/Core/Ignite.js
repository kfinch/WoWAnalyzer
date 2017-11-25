import SPELLS from 'common/SPELLS';
import Combatants from 'Parser/Core/Modules/Combatants';
import Analyzer from 'Parser/Core/Analyzer';
import StatTracker from 'Parser/Core/Modules/StatTracker';

const IGNITE_PROCCERS = [
	SPELLS.FIREBALL.id,
	SPELLS.FIRE_BLAST.id,
	SPELLS.SCORCH.id,
	SPELLS.PYROBLAST.id,
	SPELLS.METEOR_DAMAGE.id,
	SPELLS.CINDERSTORM_DAMAGE.id,
	SPELLS.FLAMESTRIKE.id,
];

const EVERBURNING_CONSUMPTION_BONUS = 0.04;
const HOT_STREAK_IGNITE_MULT = 2;
const HOT_STREAK_BUFFER_MS = 200;

const DEBUG = false;

class Ignite extends Analyzer {
	static dependencies = {
		combatants: Combatants,
		statTracker: StatTracker,
	}

	everburningConsuptionRank = 0;

	_lastPyroHotStreak = false;

	// track predicted ignite damage here, can compare with actual on_finished to track accuracy
	// known differences: expected doesn't account for jumping ignites, and doesn't account for leftover ignite on encounter end
	_expectedIgniteDamage = 0;
	_actualIgniteDamage = 0;

	on_initialized() {
		this.everburningConsuptionRank = this.combatants.selected.traitsBySpellId[SPELLS.EVERBURNING_CONSUMPTION_TRAIT.id];
	}

  on_byPlayer_damage(event) {
		if(!DEBUG) {
			return;
		}

		const spellId = event.ability.guid;
		const baseDamage = event.amount + (event.absorbed || 0);
		if (spellId === SPELLS.IGNITE.id) {
			this._actualIgniteDamage += baseDamage;
		} else if (IGNITE_PROCCERS.includes(spellId)) {
			this._expectedIgniteDamage += this._getIgniteDamage(event);
		}
	}

	on_byPlayer_cast(event) {
		const spellId = event.ability.guid;
		if (spellId === SPELLS.PYROBLAST.id) {
			this._lastPyroHotStreak = this.combatants.selected.hasBuff(SPELLS.HOT_STREAK_BUFF.id, null, HOT_STREAK_BUFFER_MS);
		}
	}

	on_finished() {
		if(!DEBUG) {
			return;
		}
		console.log("Expected Ignite Damage: " + this._expectedIgniteDamage);
		console.log("Actual Ignite Damage: " + this._actualIgniteDamage);
	}

	/*
	 * Gets a damage event's damage with ignite considered directly part of its damage.
	 * Does not consider additional ignite damage due to target jumping.
	 * For spells that proc ignite, will return spell's damage plus the amount of ignite it produced (estimated)
	 * For spells that don't proc ignite, will return their damage unmodified.
	 * For Ignite, will return zero.
	 */
	getDamageWithIgnite(event) {
		const spellId = event.ability.guid;
		const baseDamage = event.amount + (event.absorbed || 0);
		if (spellId === SPELLS.IGNITE.id) {
			return 0;
		} else if (IGNITE_PROCCERS.includes(spellId)) {
			return baseDamage + this._getIgniteDamage(event);
		} else {
			return baseDamage;
		}
	}

	_getIgniteDamage(event) {
		const damage = event.amount + (event.absorbed || 0);
		const spellId = event.ability.guid;
		let igniteBonus = this.statTracker.currentMasteryPercentage * (1 + (this.everburningConsuptionRank * EVERBURNING_CONSUMPTION_BONUS));
		if (spellId === SPELLS.PYROBLAST.id && this._lastPyroHotStreak) {
			igniteBonus *= HOT_STREAK_IGNITE_MULT;
			if(DEBUG) {
				console.log(`Hot Streak Pyro!`);
			}
		}
		const igniteDamage = damage * igniteBonus;
		if(DEBUG) {
			console.log(`${event.ability.name} - Base: ${damage}  Ignite: ${igniteDamage.toFixed(0)}`);
		}

		return igniteDamage;
	}

}

export default Ignite;
