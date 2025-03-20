import { statusCompleteLog, statusFailLog } from '../utils/log';
import { selectRollup } from '../utils/project-manage';
import { getDockerCompose, getKurtosis, runKurtosisCommand } from '../utils/system';

export const StatusCMDCLI = async () => {
  try{

        // verify docker and kurtosis are installed
        const dockerComposeTest = await getDockerCompose();
        if (!dockerComposeTest.isDockerComposeInstalled) throw('Docker Compose is not installed');
      
        const kurtosisTest = await getKurtosis();
        if (!kurtosisTest.isKurtosisInstalled) throw('Kurtosis is not installed');


        const rollupName = await selectRollup();
          
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
