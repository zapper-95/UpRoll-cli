#!/usr/bin/env node

import { Command } from 'commander';
import { startLog } from './utils/log';

import packageJson from '../package.json';
import { mainCMDCLI } from './commands/main-cmd-cli';
import { RollupDeploy } from './commands/rollup-deploy';

startLog();
const program = new Command();

program
  .name('opstack-cli')
  .description('A CLI tool for manage opstack deployment')
  .version(packageJson.version);

program.command('run').description('Run Opstack CLI Tool').action(() => mainCMDCLI());
program
  .command('deploy')
  .description('Deploy Rollup')
  .option('-i, --id <id>', 'id of endpoint')
  .option('-f, --file <config>', 'config file to deploy')
  .action((options) => {
    const hasID = Boolean(options.id);
    const hasFile = Boolean(options.file);
    
    if (hasID === hasFile) {
      console.error('Error: You must specify only one of --id or --file');
      process.exit(1);
    }

    RollupDeploy(options);
  });

// get version in package.json
program
  .command('version')
  .description('Get version of Opstack CLI')
  .action(() => {
    console.log(`Version: ${packageJson.version}`);
  });

program.parse(process.argv);
