import { rollupConfigLog, deployCompleteLog, deployFailedLog} from '../../utils/log';
import { configToYAML } from '../../configs/to-yaml';
import { GetRollupConfig } from "./get-rollup-config"
import { getProjectDetails } from '../../configs/project';
import { PATH_NAME } from '../../utils/config';
import { loadingBarAnimationInfinite } from '../../utils/log';
import { getDockerCompose, getKurtosis, runKurtosisCommand } from '../../utils/system';
import { ensureProjectDirectory } from '../../utils/project-manage';
import path from 'path';

export async function RollupdeployCommandCLI() {

  console.clear();
  rollupConfigLog();

  try{
    const dockerComposeTest = await getDockerCompose();
    if (!dockerComposeTest.isDockerComposeInstalled) throw('Docker Compose is not installed');

    const kurtosisTest = await getKurtosis();
    if (!kurtosisTest.isKurtosisInstalled) throw("Kurtosis is not installed");

    const projectDetails = await getProjectDetails();

    // make a directory with the project name in a project folder
    ensureProjectDirectory(projectDetails.projectName);
    
    if (projectDetails.networkType === "devnet"){
      await deployDevnet(projectDetails);
    }
    else{ // Testnet
      await deployTestnet(projectDetails);
    }

    // save relevant chain info to the project directory
    await saveChainInfo(projectDetails.projectName);
    deployCompleteLog();
  }catch(error){ 
    deployFailedLog(String(error));
  }
}

async function saveChainInfo(projectName:string){
    const loading = loadingBarAnimationInfinite(
      '🚀 Downloading deployment information'
    );
  
  return runKurtosisCommand("kurtosis", [
    'enclave',
    'dump',
    projectName,
    path.join('./dist/projects/', projectName, "deployment")
  ])
  .then(() => clearInterval(loading))
} 

async function deployDevnet(projectDetails: {projectName: string, networkType: string}){
  console.log("Runnning with default devnet config");
  
  // Run Kurtosis using the default devnet config
  return runKurtosisCommand(
    'kurtosis',
    [
      'run',
      './optimism-package',
      '--enclave', 
      projectDetails.projectName
    ]
  )
}

async function deployTestnet(projectDetails: {projectName: string, networkType: string}){

    // Get the testnet details from the user
    let postData: {[key: string]: any};
    try{
      postData = await GetRollupConfig(projectDetails.projectName);
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }

    // Convert the testnet details to a YAML file
    try{
      configToYAML(postData);
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }


    // Run Kurtosis using the testnet config
    return runKurtosisCommand(
      'kurtosis',
      [
        'run',
        './optimism-package',
        '--args-file',
        `${PATH_NAME.UPROLL_CLI}/dist/projects/${projectDetails.projectName}/config.yaml`,
        '--enclave',
        projectDetails.projectName,
      ]
    )
}
