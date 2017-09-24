import SPELLS from 'common/SPELLS';
import { formatPercentage } from 'common/format';

import Module from 'Parser/Core/Module';

const PANDEMIC_THRESHOLD = 11500;//don't refresh with more than 4.5 seconds left on Flametongue buff

class FlametongueRefresh extends Module {
  flametongueTimestamp = 0;
  flametongueCasts = 0;
  earlyRefresh = 0;
  refreshPercentageCast = 0;

  on_byPlayer_cast(event) {
    if(event.ability.guid === SPELLS.FLAMETONGUE.id) {
      this.flametongueCasts += 1;

      this.refreshPercentageCast = this.earlyRefresh / this.flametongueCasts;
    }
  }

  on_byPlayer_applybuff(event) {
    if(event.ability.guid === SPELLS.FLAMETONGUE_BUFF.id) {
      this.flametongueTimestamp = event.timestamp;
    }
  }

  on_byPlayer_refreshbuff(event) {
    if(event.ability.guid === SPELLS.FLAMETONGUE_BUFF.id) {
      if(this.flametongueTimestamp !== 0) {
        if(event.timestamp - this.flametongueTimestamp < PANDEMIC_THRESHOLD) {
          this.earlyRefresh += 1;
        }
      }
      this.flametongueTimestamp = event.timestamp;
    }
  }

  suggestions(when) {
    when(this.earlyRefresh).isGreaterThan(0)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(`Avoid refreshing Flametongue with more then 4.5 sec left on the buff. Some early refreshes are unavoidable.`)
          .icon(SPELLS.FLAMETONGUE_BUFF.icon)
          .actual(`${actual} of ${this.flametongueCasts} (${formatPercentage(this.refreshPercentageCast, 0)}%) early refreshes`)
          .recommended(`${(recommended)} recommended`)
          .regular(recommended + 3)
          .major(recommended + 5);
      });
  }
}

export default FlametongueRefresh;
