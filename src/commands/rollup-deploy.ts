import fs from 'fs';
import yaml from 'js-yaml';
import { getProjectName ,getOverwriteExistingEnclave as getOverwriteExistingEnclave} from '../configs/project';
import { cloneOptimismPacakge } from '../utils/clone';
import { WEBSITE } from '../utils/config';
import { runKurtosisCommand } from '../utils/system';
import { deployFailedLog, rollupConfigLog, deployCompleteLog} from '../utils/log';
import { ensureProjectDirectory, getProjectConfig, overwriteExistingEnclave, saveChainInfo,  } from '../utils/project-manage';

export async function RollupDeploy(options: {id?: string, file?: string}) {
  const {id, file} = options;
  
  await cloneOptimismPacakge();
  
  rollupConfigLog();
  
  const projectName = await getProjectName();

  // make a directory with the project name in a project folder
  await ensureProjectDirectory(projectName.projectName);

  const {removeEnclave} = await getOverwriteExistingEnclave();
  if (removeEnclave){
    await overwriteExistingEnclave(projectName.projectName);
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

    await saveChainInfo(projectName.projectName);
    deployCompleteLog();
  }
  catch(error){
    deployFailedLog(String(error));
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

