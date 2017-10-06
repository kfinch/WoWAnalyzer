import React from 'react';
import { STATISTIC_ORDER } from 'Main/StatisticBox';
import ExpandableStatisticBox from 'Main/ExpandableStatisticBox';
import { formatPercentage } from 'common/format';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';

import SPELLS from 'common/SPELLS';
import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';

import SuggestionThresholds from '../../SuggestionThresholds';

const debug = false;

const FLOURISH_EXTENSION_SECONDS = 6;

// These weights are based on the %SP per second the HoT is expected to do, based on tooltip
const WG_WEIGHT = 34;
const CW_WEIGHT = 110;
const REJUV_WEIGHT = 20 * 1.15; // the +15% from first artifact point
const REGROWTH_WEIGHT = 5;
const LB_WEIGHT = 25;
const SB_WEIGHT = 10;


// TODO: Idea - Give suggestions on low amount/duration extended with flourish on other HoTs
class Flourish extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  flourishCount = 0;
  wildGrowth = 0;
  wildGrowthCasts = 0;
  rejuvenation = 0;
  regrowth = 0;
  cultivation = 0;
  cenarionWard = 0;
  lifebloom = 0;
  springBlossoms = 0;

  flourishes = [];

  hasCenarionWard = false;

  on_initialized() {
    this.active = this.combatants.selected.hasTalent(SPELLS.FLOURISH_TALENT.id);
    this.hasCenarionWard =  this.combatants.selected.hasTalent(SPELLS.CENARION_WARD_TALENT.id);
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (SPELLS.FLOURISH.id !== spellId) {
      return;
    }

    debug && console.log(`Flourish cast #: ${this.flourishCount}`);
    this.flourishCount += 1;

    const wgCount = this._hotCount(SPELLS.WILD_GROWTH.id, event.timestamp);
    this.wildGrowth += wgCount;
    if(wgCount > 0) {
      this.wildGrowthCasts += 1;
    }

    const rejuvCount = this._hotCount(SPELLS.REJUVENATION.id, event.timestamp);
    this.rejuvenation += rejuvCount;

    const germCount = this._hotCount(SPELLS.REJUVENATION_GERMINATION.id, event.timestamp);
    this.rejuvenation += germCount;

    const rgCount = this._hotCount(SPELLS.REGROWTH.id, event.timestamp);
    this.regrowth += rgCount;

    const lbCount = this._hotCount(SPELLS.LIFEBLOOM_HOT_HEAL.id, event.timestamp);
    this.lifebloom += lbCount;

    const sbCount = this._hotCount(SPELLS.SPRING_BLOSSOMS.id, event.timestamp);
    this.springBlossoms += sbCount;

    const cwCount = this._hotCount(SPELLS.CENARION_WARD.id, event.timestamp);
    this.cenarionWard += cwCount;

    const cultCount = this._hotCount(SPELLS.CULTIVATION.id, event.timestamp);
    this.cultivation += cultCount;

    // Due to cultivation's refresh mechanic, we don't count it in total
    const totalCount = wgCount + rejuvCount + germCount + rgCount + lbCount + sbCount + cwCount;
    const weightedPowerPerSecond = (wgCount * WG_WEIGHT) + (rejuvCount * REJUV_WEIGHT) + (germCount * REJUV_WEIGHT) +
        (rgCount * REGROWTH_WEIGHT) + (lbCount * LB_WEIGHT) + (sbCount * SB_WEIGHT) + (cwCount * CW_WEIGHT);
    const weightedPower = weightedPowerPerSecond * FLOURISH_EXTENSION_SECONDS;
    this.flourishes.push({ 'count': totalCount, 'weightedPower': weightedPower });
  }

  _hotCount(hotId, timestamp) {
    return Object.values(this.combatants.players)
        .reduce((total, player) => total += (player.hasBuff(hotId, timestamp, 0, 0) ? 1 : 0), 0);
  }

  suggestions(when) {
    if(this.flourishCount === 0) {
      return;
    }

    const wgsExtended = this.wildGrowthCasts / this.flourishCount;
    when(wgsExtended).isLessThan(SuggestionThresholds.FLOURISH_WG_EXTEND.minor)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<span>Your <SpellLink id={SPELLS.FLOURISH.id} /> should always aim to extend a <SpellLink id={SPELLS.WILD_GROWTH.id} /></span>)
          .icon(SPELLS.FLOURISH.icon)
          .actual(`${formatPercentage(this.wildGrowthCasts / this.flourishCount, 0)}% WGs extended.`)
          .recommended(`${formatPercentage(recommended)}% is recommended`)
          .regular(SuggestionThresholds.FLOURISH_WG_EXTEND.regular).major(SuggestionThresholds.FLOURISH_WG_EXTEND.major);
      });

    if(this.hasCenarionWard) {
      const cwsExtended = this.cenarionWard / this.flourishCount;
      when(cwsExtended).isLessThan(SuggestionThresholds.FLOURISH_CW_EXTEND.minor)
        .addSuggestion((suggest, actual, recommended) => {
          return suggest(<span>Your <SpellLink id={SPELLS.FLOURISH.id} /> should always aim to extend a <SpellLink id={SPELLS.CENARION_WARD.id} /></span>)
            .icon(SPELLS.FLOURISH.icon)
            .actual(`${this.cenarionWard}/${this.flourishCount} CWs extended.`)
            .recommended(`${formatPercentage(recommended)}% is recommended`)
            .regular(SuggestionThresholds.FLOURISH_CW_EXTEND.regular).major(SuggestionThresholds.FLOURISH_CW_EXTEND.major);
        });
    }
  }

  statistic() {
    const totalHotsExtended = this.flourishes.reduce((total, flourish) => total += flourish.count, 0);
    const avgHotsExtended = (totalHotsExtended / this.flourishCount) || 0;

    return(
      <ExpandableStatisticBox
        icon={<SpellIcon id={SPELLS.FLOURISH_TALENT.id} />}
        value={`${avgHotsExtended.toFixed(1)}`}
        label="Average HoTs Extended"
        tooltip={
          `The average and per Flourish counts do <i>not</i> include Cultivation due to its refresh mechanic.<br>
          Your ${this.flourishCount} Flourish casts extended:
          <ul>
            <li>${this.wildGrowthCasts}/${this.flourishCount} Wild Growth casts (${this.wildGrowth} HoTs)</li>
            ${this.hasCenarionWard
              ? `<li>${this.cenarionWard}/${this.flourishCount} Cenarion Wards</li>`
              : ``
            }
            ${this.rejuvenation > 0
              ? `<li>${this.rejuvenation} Rejuvenations</li>`
              : ``
            }
            ${this.regrowth > 0
              ? `<li>${this.regrowth} Regrowths</li>`
              : ``
            }
            ${this.lifebloom > 0
              ? `<li>${this.lifebloom} Lifebloom</li>`
              : ``
            }
            ${this.springBlossoms > 0
              ? `<li>${this.springBlossoms} Spring Blossoms</li>`
              : ``
            }
            ${this.cultivation > 0
              ? `<li>${this.cultivation} Cultivations (not counted in total)</li>`
              : ``
            }
          </ul>
          <br>
          The 'HoT Power' column gives an indication of the total power of extending each HoT by 6 seconds, expressed as a percentage of your spell power. This value considers only the base power of each HoT (and the +15% to rejuvenation from the first point in your artifact weapon). It does not factor in overhealing or any of your secondary stats.`
        }
      >
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Cast</th>
              <th># of HoTs</th>
              <th>HoT Power</th>
            </tr>
          </thead>
          <tbody>
            {
              this.flourishes.map((element, index) => (
                <tr key={index}>
                  <th scope="row">{ index + 1 }</th>
                  <td>{ element.count }</td>
                  <td>{ element.weightedPower }% SP</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </ExpandableStatisticBox>
    );
  }
  statisticOrder = STATISTIC_ORDER.OPTIONAL();


}

export default Flourish;
