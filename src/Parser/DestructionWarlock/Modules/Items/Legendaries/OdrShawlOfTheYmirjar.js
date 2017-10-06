import React from 'react';
import Module from 'Parser/Core/Module';
import Combatants from 'Parser/Core/Modules/Combatants';
import Enemies from 'Parser/Core/Modules/Enemies';

import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import { formatNumber } from 'common/format';

import getDamageBonus from '../../WarlockCore/getDamageBonus';

const ODR_SHAWL_OF_THE_YMIRJAR_DAMAGE_BONUS = 0.15;

const AFFECTED_SPELLS = new Set([
  SPELLS.SHADOWBURN.id,
  SPELLS.INCINERATE.id,
  SPELLS.DRAIN_LIFE.id,
  SPELLS.CONFLAGRATE.id,
  SPELLS.CHAOS_BOLT.id,
  SPELLS.IMMOLATE_DEBUFF.id,
  SPELLS.IMMOLATE_CAST.id,
  // don't have these two statistically proven to be buffed, might be just RNG, but looks like they are
  SPELLS.MAGISTRIKE_RESTRAINTS_CHAOS_BOLT.id,
  SPELLS.CHANNEL_DEMONFIRE_DAMAGE.id,
  // TODO: don't know if some other spells are affected, pet damage, Dimensional Rifts, Channel Demonfire, cleaved CB from leg wrists...
  // And Warlock discord has been ignoring me because it's by far the worst legendary and I "shouldn't even bother" with this
  // some sources suggest that pet damage (unfortunately including rifts as those are technically pets) isn't buffed
]);

class OdrShawlOfTheYmirjar extends Module {
  static dependencies = {
    enemies: Enemies,
    combatants: Combatants,
  };

  bonusDmg = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasBack(ITEMS.ODR_SHAWL_OF_THE_YMIRJAR.id);
  }

  on_byPlayer_damage(event) {
    const enemy = this.enemies.getEntity(event);
    if (!enemy || !enemy.hasBuff(SPELLS.ODR_SHAWL_OF_THE_YMIRJAR_DEBUFF.id, event.timestamp) || !AFFECTED_SPELLS.has(event.ability.guid)) {
      return;
    }
    this.bonusDmg += getDamageBonus(event, ODR_SHAWL_OF_THE_YMIRJAR_DAMAGE_BONUS);
  }

  item() {
    return {
      item: ITEMS.ODR_SHAWL_OF_THE_YMIRJAR,
      result: (
        <dfn data-tip={`Total bonus damage contributed: ${formatNumber(this.bonusDmg)}`}>
          {this.owner.formatItemDamageDone(this.bonusDmg)}
        </dfn>
      ),
    };
  }
}

export default OdrShawlOfTheYmirjar;
