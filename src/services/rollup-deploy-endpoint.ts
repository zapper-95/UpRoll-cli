import { rollupConfigLog, deployCompleteLog, deployFailedLog} from '../utils/log';
import { runKurtosisCommand , runCommand} from '../utils';
import { getProjectName } from './get-project-details';
import fs from 'fs';
import { PATH_NAME } from '../utils/config';
const yaml = require('js-yaml');


export async function RollupDeployEndpoint(endpoint:string) {
  try{
    rollupConfigLog();
  
    const projectName = await getProjectName();
  
    // make a directory with the project name in a project folder
    await runCommand('mkdir -p ./dist/projects/');
    await runCommand('mkdir -p ./dist/projects/' + projectName.projectName + "/");
    
    await downloadConfig(endpoint, projectName.projectName);
    
    await deployFromEndpoint(endpoint, projectName.projectName);
 
  } catch(error){
    deployFailedLog(String(error));
  }
}

async function downloadConfig(endpoint:string, projectName:string) {  
  try{
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Could not download config file');
    }
    const text = await response.text();
    const yamltext = yaml.load(text);
    const yamlObj = yaml.dump(yamltext);
    // write yaml object to file
    fs.writeFile(`${PATH_NAME.UPROLL_CLI}/dist/projects/${projectName}/config.yaml`, yamlObj, (error)=>{
      if (error){
        throw new Error('Could not write retrieved file to yaml');
      }
    });
  }catch(error){
    throw error;
  }
}

async function deployFromEndpoint(endpoint:string, projectName:string) {
  let command =  runKurtosisCommand(
    'kurtosis',
    [
      'run',
      './optimism-package',
      '--args-file',
      endpoint,
      '--enclave',
      projectName
    ]
  );
  command.then(
    deployCompleteLog,
    (err) => deployFailedLog(String(err))
  );

}

