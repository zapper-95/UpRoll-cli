import { removeEnclave } from '../utils/kurtosis';
import { logFailure, logSuccess } from '../utils/log';
import { removeProjectDirectory, selectRollup } from '../utils/project-manage';

export async function StopCMDCLI() {
  let rollupName = '';
  try {
    rollupName = await selectRollup();
    await removeProjectDirectory(rollupName);
    // Stop the deployment
    await removeEnclave(rollupName);
    // log success message
    logSuccess(`Rollup ${rollupName} has been stopped and removed successfully.`);

  } catch (err) {
    logFailure("Failed to stop the rollup.", String(err));
  }
}




