import { Command } from 'commander';

import { setVersion } from './github/set-version';
import { syncChangelogLabels } from './github/sync-changelog-labels';
import { validatePrPolicy } from './github/validate-pr-policy';

const program = new Command();
const github = program
  .name('galfus-scripts')
  .description('Galfus repository automation commands')
  .command('github')
  .description('GitHub workflow commands');



github
  .command('set-version')
  .description('Apply an artifact version or derive it from a release branch')
  .option('-c, --component <component>', 'Artifact component: all, editor, or playground')
  .option('-t, --tag <tag>', 'Release channel tag')
  .option('-v, --version <version>', 'Semantic version')
  .action(setVersion);

github
  .command('sync-changelog-labels')
  .description('Synchronize changelog labels selected in a pull request')
  .action(syncChangelogLabels);

github
  .command('validate-pr-policy')
  .description('Validate pull request title, links, labels, and promotion rules')
  .action(validatePrPolicy);



program.parseAsync(process.argv).catch((error) => {
  console.error('[galfus-scripts] Failed:', error);
  process.exitCode = 1;
});
