import { getAllDockerPs } from '../shared';
import { getAuthToken, getDeploymentStatus } from '../shared/api';
import { consoleLogTable } from '../utils';

export const StatusCMDCLI = async () => {
  const DeploymentStatus = await getDeploymentStatus();
  console.log('Deployment', DeploymentStatus.deploy ? '✅' : '❌');
  console.log('Deployment status:', DeploymentStatus.status);
  const dockerPs = await getAllDockerPs();
  // console.log(backendStatus);
  consoleLogTable(dockerPs);
};
