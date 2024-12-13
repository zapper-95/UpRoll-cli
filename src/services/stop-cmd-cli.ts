import inquirer from 'inquirer';
import { getDeploymentStatus, stopAllContainers } from '../shared/api';
import { colors } from '../utils/colors';

export async function StopCMDCLI() {
  const deploymentStatus = await getDeploymentStatus();
  if (!deploymentStatus) {
    console.log(colors.fg.red, 'Deployment not found', colors.reset);
    return;
  }
  if (deploymentStatus.status === 'DOWN') {
    console.log(
      colors.fg.green,
      'The deployment is already stopped',
      colors.reset
    );
    return;
  }
  const { is_confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'is_confirm',
      message: 'Are you sure you want to stop the deployment?',
    },
  ]);

  if (!is_confirm) {
    return;
  }

  console.log('Stopping the deployment...');
  await stopAllContainers();
}
