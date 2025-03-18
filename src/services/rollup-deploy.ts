import { rollupConfigLog, deployCompleteLog, deployFailedLog} from '../utils/log';
import { runKurtosisCommand , runCommand} from '../utils';
import { getProjectName } from './get-project-details';
import fs from 'fs';
import { PATH_NAME, WEBSITE} from '../utils/config';
import { ensureProjectDirectory } from '../utils/project';
import { config } from 'dotenv';
const yaml = require('js-yaml');


export async function RollupDeploy(options: {id?: string, file?: string}) {
  const {id, file} = options;

  rollupConfigLog();
  
  const projectName = await getProjectName();

  // make a directory with the project name in a project folder
  const projectPath = await ensureProjectDirectory(projectName.projectName);
  try{
    if (id){
      console.log("Deploying from endpoint");
      await RollupDeployEndpoint(id, projectName.projectName, projectPath);
    }
    else if (file){
      console.log("Deploying from file");
      await RollupDeployFile(file, projectName.projectName, projectPath);
    }
    else{
      throw new Error("Either --id or --file must be specified");
    }
  }
  catch(error){
    deployFailedLog(String(error));
  }

}


export async function RollupDeployFile(file_path:string, projectName: string, projectPath: string) {
  // try to read the file and save it to a yaml in the project folder
  try{
    if (!file_path.endsWith('.yaml')){
      throw new Error('File must be a yaml file');
    }

    const yamltext = await fs.promises.readFile(file_path, 'utf8');
    const yamlObj = yaml.load(yamltext);
    const yamlString = yaml.dump(yamlObj);
    
    const configPath = `${projectPath}/config.yaml`;

    await fs.promises.writeFile(configPath, yamlString);
    console.log('Saved config file');
    await deployFromConfig(configPath, projectName);
  }catch(error){  
    deployFailedLog(String(error));
  }
}

export async function RollupDeployEndpoint(id:string, projectName: string, projectPath:string) {
  try{
    let endpoint = WEBSITE.ENDPOINT.replace('[id]', id);

    let configPath = `${projectPath}/config.yaml`;
    await downloadConfig(endpoint, configPath);
    console.log('Downloaded config file');
    await deployFromConfig(configPath, projectName);
 
  } catch(error){
    deployFailedLog(String(error));
  }
}

async function downloadConfig(endpoint:string, configPath:string) {  
  try{
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Could not download config file');
    }
    const text = await response.text();
    const yamltext = yaml.load(text);
    const yamlObj = yaml.dump(yamltext);

    await fs.promises.writeFile(configPath, yamlObj);
  }catch(error){
    throw error;
  }
}

async function deployFromConfig(configPath:string, projectName:string) {
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

