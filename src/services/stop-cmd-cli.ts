import { colors } from '../utils/colors';
import {selectRollup} from '../shared/index'
import { PATH_NAME } from '../utils/config';

import {runKurtosisCommand} from '../utils';
import { stopCompleteLog, stopFailedLog} from '../utils/log';
import { loadingBarAnimationInfinite } from '../utils/log';
import { removeProjectDirectory } from '../utils/project';

export async function StopCMDCLI() {
  let rollupName = '';
  let loading;

  try {
    rollupName = await selectRollup();
    loading = loadingBarAnimationInfinite('🚀 Stopping deployment');
    removeProjectDirectory(rollupName);

    // Stop the deployment
    await runKurtosisCommand('kurtosis', [
      'enclave',
      'rm',
      rollupName,
      "--force"
    ]);


  } catch (err) {
    stopFailedLog(String(err));
  } finally {
    if (loading) clearInterval(loading);
  }
}




