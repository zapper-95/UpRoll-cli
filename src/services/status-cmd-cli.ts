import { getAllDockerPs } from '../shared';
import { getAuthToken, getDeploymentStatus } from '../shared/api';
import { consoleLogTable } from '../utils';
import { getKurtosis } from '../shared';
import { colors } from '../utils/colors';
import {selectRollup} from '../shared/index'
import { runKurtosisCommand} from '../utils';
import { statusCompleteLog, statusFailLog } from '../utils/log';

export const StatusCMDCLI = async () => {
  const kurtosisTest = await getKurtosis();
  if (!kurtosisTest.isKurtosisInstalled) {
    console.log(colors.fg.red, 'Kurtosis is not installed', colors.reset);
    return;
  }

  try{
        let rollupName = await selectRollup();
        await runKurtosisCommand('kurtosis', [
          'enclave',
          'inspect',
          rollupName,
        ]);
        statusCompleteLog();

  }
  catch(err){
    statusFailLog(String(err));
  }
};
