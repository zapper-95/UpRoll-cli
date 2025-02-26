import inquirer from 'inquirer';
import { rollupConfigLog , kurtosisRunConfig, deployCompleteLog, deployFailedLog} from '../utils/log';
import { runKurtosisCommand , runCommand} from '../utils';
import { configToYAML } from '../utils/configtoYAML';
import path from 'path';
import { GetTestnetDetails } from "./get-testnet-details"
import { getProjectDetails } from './get-project-details';

export async function RollupdeployCommandCLI(onlyUI = false) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.clear();
  rollupConfigLog();

  const projectDetails = await getProjectDetails();

  // make a directory with the project name in a project folder
  await runCommand('mkdir -p ./dist/projects/');
  await runCommand('mkdir -p ./dist/projects/' + projectDetails.projectName + "/");
      
  
  if (projectDetails.networkType === "devnet"){
    await deployDevnet(projectDetails);
  }
  else{ // Testnet
    await deployTestnet(projectDetails);
  }
}



async function deployDevnet(projectDetails: {projectName: string, networkType: string}){
  console.log("Runnning with default devnet config");
  
  // Run Kurtosis using the default devnet config
  let command = runKurtosisCommand(
    'kurtosis',
    [
      'run',
      './optimism-package',
      '--args-file',
      './dist/templates/devnet_config.yaml',
      '--enclave', 
      projectDetails.projectName
    ]
  )
  command.then(
    deployCompleteLog,
    (err) => deployFailedLog(String(err))
  );
}

async function deployTestnet(projectDetails: {projectName: string, networkType: string}){

    // Get the testnet details from the user
    let postData: {[key: string]: any};
    try{
      postData = await GetTestnetDetails();
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }

    // Convert the testnet details to a YAML file
    try{
      configToYAML(projectDetails.projectName, postData);
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }

    kurtosisRunConfig();

    // Run Kurtosis using the testnet config
    let command =  runKurtosisCommand(
      'kurtosis',
      [
        'run',
        './optimism-package',
        '--args-file',
        'dist/projects/' + projectDetails.projectName + '/config.yaml',
        '--enclave',
        projectDetails.projectName,
      ]
    );
    
    command
    .then(
      deployCompleteLog,
      (err) => deployFailedLog(String(err))
    )
}
