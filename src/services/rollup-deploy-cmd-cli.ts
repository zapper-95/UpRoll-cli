import { rollupConfigLog , kurtosisRunTestnetLog, deployCompleteLog, deployFailedLog, saveChainInfoLog, saveChainInfoCompleteLog, saveChainInfoFailedLog} from '../utils/log';
import { runKurtosisCommand , runCommand} from '../utils';
import { configToYAML } from '../utils/configtoYAML';
import { GetRollupConfig } from "./get-rollup-config"
import { getProjectDetails } from './get-project-details';
import { PATH_NAME } from '../utils/config';
import { loadingBarAnimationInfinite } from '../utils/log';

export async function RollupdeployCommandCLI(onlyUI = false) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.clear();
  rollupConfigLog();

  const projectDetails = await getProjectDetails();

  // make a directory with the project name in a project folder
  await runCommand(`mkdir -p ${PATH_NAME.UPROLL_CLI}/dist/projects/`);
  await runCommand(`mkdir -p ${PATH_NAME.UPROLL_CLI}/dist/projects/${projectDetails.projectName}/`);
      
  
  if (projectDetails.networkType === "devnet"){
    await deployDevnet(projectDetails);
  }
  else{ // Testnet
    await deployTestnet(projectDetails);
  }
  // save relevant chain info to the project directory
    await saveChainInfo(projectDetails.projectName);
}

async function saveChainInfo(projectName:string){
    const loading = loadingBarAnimationInfinite(
      '🚀 Downloading deployment information'
    );
  
  return runKurtosisCommand("kurtosis", [
    'files',
    'download',
    projectName,
    'op-deployer-configs',
    './dist/projects/' + projectName
  ])
  .then(() => clearInterval(loading))
  .then(
    ()=> saveChainInfoCompleteLog(),
  (err) => saveChainInfoFailedLog(String(err))
  )
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
  ).then(
    ()=> deployCompleteLog(),
  (err) => deployFailedLog(String(err))
);
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
    ).then(
      ()=> deployCompleteLog(),
    (err) => deployFailedLog(String(err))
    )
}
