import React from 'react';

import SPECS from 'common/SPECS';
import SPEC_ANALYSIS_COMPLETENESS from 'common/SPEC_ANALYSIS_COMPLETENESS';

import CombatLogParser from './CombatLogParser';
import CHANGELOG from './CHANGELOG';

import ChizuAvatar from './Images/Chizu_avatar.jpg';

export default {
  spec: SPECS.DEMONOLOGY_WARLOCK,
  maintainer: '@Chizu',
  maintainerAvatar: ChizuAvatar,
  completeness: SPEC_ANALYSIS_COMPLETENESS.NEEDS_MORE_WORK, // When changing this please make a PR with ONLY this value changed, we will do a review of your analysis to find out of it is complete enough.
  changelog: CHANGELOG,
  description: (
    <div>
      Hello fellow Netherlords! Currently this spec is still in development as I have yet to add the Demonology legendaries, keep that in mind. While I gotta admit this tool feels more like a statistic than something that really helps you (just yet!), I hope it still is useful to you. Any suggestions as to what could be useful to see are welcome and I'll try to implement them in order for this tool to be more than just a glorified WCL log. <br /> <br />

      I'm terribly sorry if you see your Dead time (time not spent doing anything) in negative numbers as that makes no sense but I currently have no clue as to why it happens. Any help with that from some savvy programmer would be appreciated. <br /> <br />

      If you have any questions about Warlocks, feel free to pay a visit to <a href="https://goo.gl/7PH6Bn" target="_blank" rel="noopener noreferrer">Council of the Black Harvest Discord</a>, if you'd like to discuss anything about this analyzer, leave a message on the GitHub issue or message me @Chizu on WoW Analyzer Discord.
    </div>
  ),
  specDiscussionUrl: 'https://github.com/WoWAnalyzer/WoWAnalyzer/issues/386',
  parser: CombatLogParser,
  path: __dirname, // used for generating a GitHub link directly to your spec
};
