import React from 'react';

import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatNumber, formatPercentage } from 'common/format';
import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';

import getDamageBonus from '../WarlockCore/getDamageBonus';

const ELT_DAMAGE_BONUS = 0.1;

class EmpoweredLifeTap extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  bonusDmg = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasTalent(SPELLS.EMPOWERED_LIFE_TAP_TALENT.id);
  }

  on_byPlayer_damage(event) {
    if (this.combatants.selected.hasBuff(SPELLS.EMPOWERED_LIFE_TAP_BUFF.id, event.timestamp)) {
      this.bonusDmg += getDamageBonus(event, ELT_DAMAGE_BONUS);
    }
  }

  suggestions(when) {
    const uptime = this.combatants.selected.getBuffUptime(SPELLS.EMPOWERED_LIFE_TAP_BUFF.id) / this.owner.fightDuration;
    when(uptime).isLessThan(0.9)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<span>Your uptime on the <SpellLink id={SPELLS.EMPOWERED_LIFE_TAP_BUFF.id} /> buff could be improved. You should cast <SpellLink id={SPELLS.LIFE_TAP.id} /> more often.<br /><br /><small><em>NOTE:</em> If you're getting 0% uptime, it might be wrong if you used <SpellLink id={SPELLS.LIFE_TAP.id} /> before combat started and maintained the buff. Due to technical limitations it's not possible to track the bonus damage nor uptime in this case.</small></span>)
          .icon(SPELLS.EMPOWERED_LIFE_TAP_TALENT.icon)
          .actual(`${formatPercentage(actual)}% Empowered Life Tap uptime`)
          .recommended(`>${formatPercentage(recommended)}% is recommended`)
          .regular(recommended - 0.05).major(recommended - 0.15);
      });
  }

  statistic() {
    const uptime = this.combatants.selected.getBuffUptime(SPELLS.EMPOWERED_LIFE_TAP_BUFF.id) / this.owner.fightDuration;
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.EMPOWERED_LIFE_TAP_TALENT.id} />}
        value={`${formatPercentage(uptime)} %`}
        label="Empowered Life Tap uptime"
        tooltip={`Your Empowered Life Tap talent contributed ${formatNumber(this.bonusDmg)} total damage (${formatPercentage(this.owner.getPercentageOfTotalDamageDone(this.bonusDmg))} %)`}
      />
    );
  }

  statisticOrder = STATISTIC_ORDER.OPTIONAL(3);
}

export default EmpoweredLifeTap;
