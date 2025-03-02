#!/usr/bin/env node

import { Command } from 'commander';
import { startLog } from './utils/log';

import { LogsCmdAPICLI } from './services/logs-cmd-cli';
import { mainCMDCLI } from './services/main.cmd-cli';
import { apiDeployCmdCli } from './services/api-deploy-cmd-cli';
import packageJson from '../package.json';
import { RollupDeployEndpoint } from './services/rollup-deploy-endpoint';

startLog();
const program = new Command();

program
  .name('opstack-cli')
  .description('A CLI tool for manage opstack deployment')
  .version(packageJson.version);

program.command('run [endpoint]').description('Run Opstack CLI Tool').action((endpoint) => mainCMDCLI(endpoint));
program
  .command('api')
  .description('Run Opstack CLI API')
  .action(apiDeployCmdCli);
program
  .command('logs build')
  .description('View logs from Docker Compose services')
  .option('-f, --follow', 'Follow log output')
  .option(
    '-t, --tail <lines>',
    'Number of lines to show from the end of the logs',
    'all'
  )
  .action(LogsCmdAPICLI);

// get version in package.json
program
  .command('version')
  .description('Get version of Opstack CLI')
  .action(() => {
    console.log(`Version: ${packageJson.version}`);
  });

program.parse(process.argv);
