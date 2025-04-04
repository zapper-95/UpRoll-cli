import { colors } from '../utils/colors';
import { logFailure, logSuccess } from '../utils/log';
import { getProjectDeployerFile, readConfigFile, selectRollup, selectRollupConfig } from '../utils/project-manage';
import { getDockerCompose, getKurtosis } from '../utils/system';



export const InfoCMDCLI = async () => {

  console.log('------------------');
  console.log(colors.fg.magenta, 'Chain Info', colors.reset);
  console.log('------------------');

  try{
    const dockerComposeTest = await getDockerCompose();
    if (!dockerComposeTest.isDockerComposeInstalled) throw('Docker Compose is not installed');

    const kurtosisTest = await getKurtosis();
    if (!kurtosisTest.isKurtosisInstalled) throw("Kurtosis is not installed");
    
    const rollupName = await selectRollup();
    const rollupConfig = await selectRollupConfig(rollupName);
    await displayConfig(rollupName, rollupConfig);
    logSuccess(`Chain info for ${rollupName} with config ${rollupConfig} displayed successfully.`);

  }catch(err){
    logFailure("Failed to display chain info.", String(err));
  }

};

export const displayConfig = async (rollupName:string, rollupConfig:string) => {
  
  const filePath = getProjectDeployerFile(rollupName, rollupConfig);
  const data = await readConfigFile(filePath);

  console.log('------------------');
  console.log(colors.fg.magenta, `${rollupName}➜${rollupConfig}`, colors.reset);
  console.log('------------------');
  console.log(data);
};


