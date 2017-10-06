import SPECS from 'common/SPECS';
import SPEC_ANALYSIS_COMPLETENESS from 'common/SPEC_ANALYSIS_COMPLETENESS';

import CombatLogParser from './CombatLogParser';

export default {
  spec: SPECS.SHADOW_PRIEST,
  maintainer: '@hassebewlen',
  completeness: SPEC_ANALYSIS_COMPLETENESS.NEEDS_MORE_WORK, // When changing this please make a PR with ONLY this value changed, we will do a review of your analysis to find out of it is complete enough.
  parser: CombatLogParser,
  path: __dirname, // used for generating a GitHub link directly to your spec
};
