import fs from 'fs';
import yaml from 'js-yaml';
import { getProjectName, getRemoveExistingEnclave } from '../configs/project';
import { cloneOptimismPacakge } from '../utils/clone';
import { WEBSITE } from '../utils/config';
import { removeEnclave, saveChainInfo } from '../utils/kurtosis';
import { logFailure, logSuccess, logWarning } from '../utils/log';
import { createProjectDirectory, getProjectConfig } from '../utils/project-manage';
import { delay, runKurtosisCommand } from '../utils/system';

export async function RollupDeploy(options: {id?: string, file?: string}) {
  const {id, file} = options;
  
  await cloneOptimismPacakge();
  
  logSuccess("Rollup deployment started.");
  
  const projectName = await getProjectName();

  // make a directory with the project name in a project folder
  await createProjectDirectory(projectName.projectName);

  const {removeEnclaveResponse} = await getRemoveExistingEnclave();
  if (removeEnclaveResponse){
    try{
      await removeEnclave(projectName.projectName);
    }
    catch{
      // if we fail to remove the existing enclave, we should log the error but continue
      // as we might be able to deploy a new one anyway
      logWarning("Failed to remove existing enclave. This may cause issues if the deployment is using the same resources.");
      // If we can't remove the existing enclave, we should log a warning but continue with the deployment.
    }
  }


  try{
    if (id){
      console.log("Deploying from endpoint");
      await RollupDeployEndpoint(id, projectName.projectName);
    }
    else if (file){
      console.log("Deploying from file");
      await RollupDeployFile(file, projectName.projectName);
    }
    else{
      throw new Error("Either --id or --file must be specified");
    }

    await delay(2000);

    await saveChainInfo(projectName.projectName);
    logSuccess("Deployment completed successfully.");
  }
  catch(error){
    logFailure("Deployment failed.", String(error));
  }

}

export async function RollupDeployFile(file_path:string, projectName: string) {
  // try to read the file and save it to a yaml in the project folder
    if (!file_path.endsWith('.yaml')){
      throw new Error('File must be a yaml file');
    }

    const yamltext = await fs.promises.readFile(file_path, 'utf8');
    const yamlObj = yaml.load(yamltext);
    const yamlString = yaml.dump(yamlObj);
    
    const configPath = getProjectConfig(projectName);

    await fs.promises.writeFile(configPath, yamlString);
    console.log('Saved config file');
    await deployFromConfig(configPath, projectName);
  }

export async function RollupDeployEndpoint(id:string, projectName: string) {

    const endpoint = WEBSITE.ENDPOINT.replace('[id]', id);
    
    
    const configPath = getProjectConfig(projectName);
    await downloadConfig(endpoint, configPath);
    console.log('Downloaded config file');
    await deployFromConfig(configPath, projectName);
 
}

async function downloadConfig(endpoint:string, configPath:string) {  

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Could not download config file');
    }
    const text = await response.text();

    await fs.promises.writeFile(configPath, text);
}

async function deployFromConfig(configPath:string, projectName:string) {
  console.log(configPath);
  return runKurtosisCommand(
    'kurtosis',
    [
      'run',
      './optimism-package',
      '--args-file',
      configPath,
      '--enclave',
      projectName
    ]
  );
}

