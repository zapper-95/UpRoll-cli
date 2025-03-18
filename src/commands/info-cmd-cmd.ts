import path from 'path';
import { colors } from '../utils/colors';
import { PATH_NAME } from '../utils/config';
import { infoCompleteLog, infoFailLog } from '../utils/log';
import { readConfigFile, selectRollup, selectRollupConfig } from '../utils/project-manage';
import { getDockerCompose, getKurtosis } from '../utils/system';



export const InfoCMDCLI = async () => {


  console.clear();
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
    infoCompleteLog();

  }catch(err){
    infoFailLog(String(err));
  }

};

export const displayConfig = async (rollupName:string, rollupConfig:string) => {
  
  const filePath = path.join(PATH_NAME.UPROLL_CLI, "dist", "projects", rollupName, "deployment", "files", "op-deployer-configs", rollupConfig);
  const data = await readConfigFile(filePath);

  console.log('------------------');
  console.log(colors.fg.magenta, `${rollupName}➜${rollupConfig}`, colors.reset);
  console.log('------------------');
  console.log(data);
};


