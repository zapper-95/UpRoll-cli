import inquirer from 'inquirer';
import { getDeploymentStatus, startAllContainers } from '../shared/api';
import { colors } from '../utils/colors';

export async function StartCMDCLI() {
  const deploymentStatus = await getDeploymentStatus();
  if (!deploymentStatus) {
    console.log(colors.fg.red, 'Deployment not found', colors.reset);
    return;
  }
  if (deploymentStatus.status === 'running') {
    console.log(
      colors.fg.green,
      'The deployment is already running',
      colors.reset
    );
    return;
  }
  const { is_confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'is_confirm',
      message: 'Are you sure you want to start the deployment?',
    },
  ]);

  if (!is_confirm) {
    return;
  }

  console.log('Starting the deployment...');
  await startAllContainers();
}
