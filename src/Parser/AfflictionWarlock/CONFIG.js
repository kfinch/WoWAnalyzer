import React from 'react';

import SPECS from 'common/SPECS';
import SPEC_ANALYSIS_COMPLETENESS from 'common/SPEC_ANALYSIS_COMPLETENESS';
import SpellLink from 'common/SpellLink';
import SPELLS from 'common/SPELLS';

import CombatLogParser from './CombatLogParser';
import CHANGELOG from './CHANGELOG';

import ChizuAvatar from './Images/Chizu_avatar.jpg';

export default {
  spec: SPECS.AFFLICTION_WARLOCK,
  maintainer: '@Chizu',
  maintainerAvatar: ChizuAvatar,
  completeness: SPEC_ANALYSIS_COMPLETENESS.NEEDS_MORE_WORK, // When changing this please make a PR with ONLY this value changed, we will do a review of your analysis to find out of it is complete enough.
  description: (
    <div>
      Hello fellow Netherlords! While I gotta admit this tool feels more like a statistic than something that really helps you (just yet!), I hope it still is useful to you. Any suggestions as to what could be useful to see are welcome and I'll try to implement them in order for this tool to be more than just a glorified WCL log. <br /> <br />

      As for a general rule of thumb - don't overcap your shards, try to get them wherever you can, snipe shards from adds when they're present. Always try to buff your <SpellLink id={SPELLS.UNSTABLE_AFFLICTION_CAST.id}/>s as much as possible, with <SpellLink id={SPELLS.DRAIN_SOUL.id}/>, <SpellLink id={SPELLS.REAP_SOULS.id}/> or <SpellLink id={SPELLS.HAUNT.id}/>. Don't let your dots fall off and try to move as least as you can (but don't ignore encounter mechanics... too much, hehe). <br /> <br />

      If you have any questions about Warlocks, feel free to pay a visit to <a href="https://goo.gl/7PH6Bn" target="_blank" rel="noopener noreferrer">Council of the Black Harvest Discord</a>, if you'd like to discuss anything about this analyzer, leave a message on the GitHub issue or message me @Chizu on WoW Analyzer Discord.
    </div>
  ),
  changelog: CHANGELOG,
  specDiscussionUrl: 'https://github.com/WoWAnalyzer/WoWAnalyzer/issues/258',
  parser: CombatLogParser,
  path: __dirname, // used for generating a GitHub link directly to your spec
};
