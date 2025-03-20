import { getProjectDetails } from '../../configs/project';
import { configToYAML } from '../../configs/to-yaml';
import { deployCompleteLog, deployFailedLog, loadingBarAnimationInfinite, rollupConfigLog } from '../../utils/log';
import { ensureProjectDirectory, getProjectConfig, getProjectDeploymentDumpFolder} from '../../utils/project-manage';
import { getDockerCompose, getKurtosis, runKurtosisCommand } from '../../utils/system';
import { GetRollupConfig } from "./get-rollup-config";

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
  
  const dumpPath = getProjectDeploymentDumpFolder(projectName); 
  return runKurtosisCommand("kurtosis", [
    'enclave',
    'dump',
    projectName,
    dumpPath,
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
      await configToYAML(postData);
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }

    const configFile = getProjectConfig(projectDetails.projectName);
    console.log(configFile)
    // Run Kurtosis using the testnet config
    return runKurtosisCommand(
      'kurtosis',
      [
        'run',
        './optimism-package',
        '--args-file',
        configFile,
        '--enclave',
        projectDetails.projectName,
      ]
    )
}
