import inquirer from 'inquirer';
import axios from 'axios';
import { CONFIG, PATH_NAME } from '../utils/config';
import { colors } from '../utils/colors';
import { loadingBarAnimationInfinite, rollupConfigLog } from '../utils/log';
import { runCommand, runLongCommand } from '../utils';
import { configToYAML } from '../utils/configtoYAML';
import {exec, spawn} from 'child_process';
import path from 'path';
import { assert, error } from 'console';
import { GetTestnetDetails } from "./get-testnet-details"

export async function RollupdeployCommandCLI(onlyUI = false) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (onlyUI) {
    return;
  }
  console.clear();

  rollupConfigLog();

  // Are you planning on making a devnet or testnet?
  const networkType = await inquirer.prompt(

    [
      {
        type: 'list',
        name: 'networkType',
        message: 'Are you planning on making a devnet or testnet?',
        choices: ['devnet', 'testnet'],
        default:
          'devnet',
      }
    ]
  )

  if (networkType.networkType === "devnet"){

    // Run Kurtosis without any user input, using the default config
    await runLongCommand(
      'kurtosis',
      [
        'run',
        '.',
        '--args-file',
        path.join(__dirname, '../config/config_template.yaml')]
    );  
  }
  else{ // Testnet

    // Get the testnet details from the user, make a config file and then run Kurtosis with that config
    const postData = await GetTestnetDetails();

    if (postData === undefined){
      return;
    }

    configToYAML(postData);
    await runLongCommand(
      'kurtosis',
      [
        'run',
        '.',
        '--args-file',
        path.join(__dirname, '../config/' + postData.configName + '.yaml')]
    );

  }

}
