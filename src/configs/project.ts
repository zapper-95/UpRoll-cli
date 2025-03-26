import inquirer from 'inquirer';
import fs from 'fs';
import { getProjectFolder } from '../utils/project-manage';
export async function getProjectName(){
  const projectName = await inquirer.prompt(
    [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name',
        default: 'my-rollup',
        validate: (value:string) =>{
            const regex = /^[a-z]([-a-z0-9]{0,61}[a-z0-9])?$/;
            if (regex.test(value) === false){
              return 'Please enter a valid project name (lowercase letters, numbers, and hyphens only, starting with a letter and not ending with a hyphen)';
            }
            
            if (fs.existsSync(getProjectFolder(value))){
              return "Project already exists";
            }
            return true;
        }

      },
    ],
  )
  return projectName;
}


export async function getOverwriteExistingEnclave(): Promise<{removeEnclave:boolean}>{
  const removeEnclave = await inquirer.prompt(
    [
      {
        type: 'confirm',
        name: 'removeEnclave',
        message: 'Do you want to remove any existing enclaves of this name?',
        default: true
      }
    ]
  )
  return removeEnclave;
}



export async function getNetworkType(){
  const networkType = await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'networkType',
        message: 'Are you planning on making a devnet or testnet?',
        choices: ['devnet', 'testnet'],
        default:
          'devnet',
      }
    ],
  )
  return networkType;
}

export async function getProjectDetails(){
    // Get the name of the project, the config file and type of rollup
    const projectName = await getProjectName();
    const networkType = await getNetworkType();
    const projectDetails = {
      projectName: projectName.projectName,
      networkType: networkType.networkType
    }
      return projectDetails;
}