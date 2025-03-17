import {selectRollup} from '../shared/index'
import { runKurtosisCommand} from '../utils';
import { statusCompleteLog, statusFailLog } from '../utils/log';
import { getDockerCompose, getKurtosis } from '../shared/';
import { loadingBarAnimationInfinite } from '../utils/log';

export const StatusCMDCLI = async () => {
  let loading;
  try{

        // verify docker and kurtosis are installed
        const dockerComposeTest = await getDockerCompose();
        if (!dockerComposeTest.isDockerComposeInstalled) throw('Docker Compose is not installed');
      
        const kurtosisTest = await getKurtosis();
        if (!kurtosisTest.isKurtosisInstalled) throw('Kurtosis is not installed');


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
