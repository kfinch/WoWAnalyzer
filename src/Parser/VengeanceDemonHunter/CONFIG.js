import SPECS from 'common/SPECS';
import SPEC_ANALYSIS_COMPLETENESS from 'common/SPEC_ANALYSIS_COMPLETENESS';

import CombatLogParser from './CombatLogParser';
import CHANGELOG from './CHANGELOG';

export default {
  spec: SPECS.VENGEANCE_DEMON_HUNTER,
  maintainer: '@Mamtooth',
  completeness: SPEC_ANALYSIS_COMPLETENESS.GREAT, // When changing this please make a PR with ONLY this value changed, we will do a review of your analysis to find out of it is complete enough.
  changelog: CHANGELOG,
  parser: CombatLogParser,
  path: __dirname, // used for generating a GitHub link directly to your spec
};
