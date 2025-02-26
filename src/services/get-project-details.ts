import inquirer from 'inquirer';
import { runCommand } from '../utils';


export async function getProjectName(){
  const projectName = await inquirer.prompt(
    [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name',
        default: 'myRollup',
      },
    ],
  )
  return projectName;
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