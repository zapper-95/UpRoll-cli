import inquirer from 'inquirer';
import { runCommand } from '../utils';
export async function getProjectDetails(){
    // Get the name of the project, the config file and type of rollup
     const projectDetails = await inquirer.prompt(
        [
          {
            type: 'input',
            name: 'projectName',
            message: 'Enter the project name',
            default: 'myRollup',
          },
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
      return projectDetails;
}