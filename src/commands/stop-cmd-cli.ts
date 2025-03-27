import { selectRollup } from '../utils/project-manage';
import { loadingBarAnimationInfinite, stopFailedLog } from '../utils/log';
import { removeProjectDirectory } from '../utils/project-manage';
import { runKurtosisCommand } from '../utils/system';

export async function StopCMDCLI() {
  let rollupName = '';
  const loading = loadingBarAnimationInfinite('🚀 Stopping deployment');

  try {
    rollupName = await selectRollup();
    await removeProjectDirectory(rollupName);

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
    clearInterval(loading);
  }
}




