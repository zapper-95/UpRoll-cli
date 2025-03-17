import inquirer from 'inquirer';
import { getDeploymentStatus, stopAllContainers } from '../shared/api';
import { colors } from '../utils/colors';
import { getKurtosis } from '../shared';
import {selectRollup} from '../shared/index'
import { PATH_NAME } from '../utils/config';

import { runCommand, runKurtosisCommand} from '../utils';
import { stopCompleteLog, stopFailedLog} from '../utils/log';
import { loadingBarAnimationInfinite } from '../utils/log';


export async function StopCMDCLI() {
  const kurtosisTest = await getKurtosis();
  if (!kurtosisTest.isKurtosisInstalled) {
    console.log(colors.fg.red, 'Kurtosis is not installed', colors.reset);
    return;
  }

  let rollupName = '';
  let loading;

  try {
    rollupName = await selectRollup();
    loading = loadingBarAnimationInfinite('🚀 Stopping deployment');

    // Stop the deployment
    await runKurtosisCommand('kurtosis', [
      'enclave',
      'rm',
      rollupName,
      "--force"
    ]);
    stopCompleteLog();

    // Only run cleanup if the deployment stop was successful
    await runCommand(`rm -r ${PATH_NAME.UPROLL_CLI}/dist/projects/${rollupName}/`);
    console.log('Rollup project folder deleted');
  } catch (err) {
    stopFailedLog(String(err));
  } finally {
    if (loading) clearInterval(loading);
  }
}




