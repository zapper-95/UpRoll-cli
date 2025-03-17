#!/usr/bin/env node

import { Command } from 'commander';
import { startLog } from './utils/log';

import { mainCMDCLI } from './services/main.cmd-cli';
import packageJson from '../package.json';

startLog();
const program = new Command();

program
  .name('opstack-cli')
  .description('A CLI tool for manage opstack deployment')
  .version(packageJson.version);

program.command('run [endpoint]').description('Run Opstack CLI Tool').action((endpoint) => mainCMDCLI(endpoint));

// get version in package.json
program
  .command('version')
  .description('Get version of Opstack CLI')
  .action(() => {
    console.log(`Version: ${packageJson.version}`);
  });

program.parse(process.argv);
