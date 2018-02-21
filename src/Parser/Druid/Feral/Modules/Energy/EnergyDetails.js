import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';
import Tab from 'Main/Tab';
import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';
import Icon from 'common/Icon';
import Wrapper from 'common/Wrapper';
import { formatPercentage } from 'common/format';
import ResourceBreakdown from 'Parser/Core/Modules/ResourceTracker/ResourceBreakdown';

import EnergyTracker from './EnergyTracker';


class EnergyDetails extends Analyzer {
  static dependencies = {
    energyTracker: EnergyTracker,
  };

  get energyWasted() {
    return this.energyTracker.wasted;
  }

  get energyWastedPerMinute() {
    return (this.energyWasted / this.owner.fightDuration) * 1000 * 60;
  }

  statistic() {
    return (
      <StatisticBox
        icon={<Icon icon="ability_warrior_decisivestrike" alt="Wasted Energy" />}
        value={`${this.energyWastedPerMinute.toFixed(0)}`}
        label="Wasted Energy per minute"
        tooltip={`You wasted a total of <b>${this.energyWasted}</b> energy. Try to use abilities before you cap on energy.`}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(5);

  get suggestionThresholds() {
    return {
      actual: this.energyWastedPerMinute,
      isGreaterThan: {
        minor: 20,
        average: 80,
        major: 150,
      },
      style: 'number',
    };
  }

  suggestions(when) {
    when(this.suggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest("You are wasting Energy. Always use an ability if you're about to cap on Energy")
          .icon('creatureportrait_bubble')
          .actual(`${this.energyWasted} Energy wasted (${this.energyWastedPerMinute.toFixed(0)} per minute)`)
          .recommended(`< ${recommended.toFixed(0)} Energy per minute wasted is recommended`);
      });
  }

  tab() {
    return {
      title: 'Energy usage',
      url: 'energy',
      render: () => (
        <Tab title="Energy usage breakdown">
          <ResourceBreakdown
            tracker={this.energyTracker}
            showSpenders={true}
          />
        </Tab>
      ),
    };
 }
}

export default EnergyDetails;
