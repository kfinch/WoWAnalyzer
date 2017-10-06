import React from 'react';

import SPECS from 'common/SPECS';
import SPEC_ANALYSIS_COMPLETENESS from 'common/SPEC_ANALYSIS_COMPLETENESS';

import CombatLogParser from './CombatLogParser';
import CHANGELOG from './CHANGELOG';

import anomolyAvatar from './Images/anomoly-avatar.jpg';

export default {
  spec: SPECS.MISTWEAVER_MONK,
  maintainer: '@anomoly',
  maintainerAvatar: anomolyAvatar,
  description: (
    <div>
      Hello all! Thanks so much for taking the time use this tool as a way to improve your play. The goal is to provide targeted suggestions to improve your overall Mistweaver Monk play. The suggestions are based on the current theorycrafting and practical knowledge from some of the best Mistweavers playing this game. (And even some former mistweavers who still like to help us dreamers out.) <br /> <br />

      The tool is not perfect so I am always looking to improve it. If you have any suggestions or comments, don't hesitated to swing by the GitHub Issue linked below, or the <a href="https://discord.gg/0dkfBMAxzTkWj21F" target="_blank" rel="noopener noreferrer">Peak of Serenity</a> discord server. You can also contact me directly on either BattleNet (Anomoly#1464) or Discord (Anomoly#6931). Thanks and I hope you continue to enjoy the tool!
    </div>
  ),

  completeness: SPEC_ANALYSIS_COMPLETENESS.GREAT, // When changing this please make a PR with ONLY this value changed, we will do a review of your analysis to find out of it is complete enough.
  specDiscussionUrl: 'https://github.com/WoWAnalyzer/WoWAnalyzer/issues/59',
  changelog: CHANGELOG,
  parser: CombatLogParser,
  path: __dirname, // used for generating a GitHub link directly to your spec
};
