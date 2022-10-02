import ResourceGraph from 'parser/shared/modules/ResourceGraph';
import EnergyTracker from 'analysis/retail/druid/feral/modules/core/energy/EnergyTracker';
import Panel from 'parser/ui/Panel';
import ComboPointTracker from 'analysis/retail/druid/feral/modules/core/combopoints/ComboPointTracker';

class EnergyGraph extends ResourceGraph {
  static dependencies = {
    ...ResourceGraph.dependencies,
    energyTracker: EnergyTracker,
    comboPointTracker: ComboPointTracker,
  };

  energyTracker!: EnergyTracker;
  comboPointTracker!: ComboPointTracker;

  statistic() {
    this.trackers.push(this.energyTracker);
    this.trackers.push(this.comboPointTracker);
    return (
      <Panel title="Energy Graph" position={100}>
        {this.plot}
      </Panel>
    );
  }
}

export default EnergyGraph;
