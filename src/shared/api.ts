import axios from 'axios';
import { getDockerComposePath, getEnvValue } from '.';
import path from 'path';
import { DockerStatus } from '../types';

/**
 * Get authentication token
 * @returns {Promise<string>}
 */
export const getAuthToken = async (
  username: string = '',
  password: string = ''
) => {
  let AUTHEN_TOKEN = '';
  const dockerComposePath = await getDockerComposePath();
  const envPath = path.join(dockerComposePath, '.env');
  // get username and password read from envPath
  if (!username) {
    username = await getEnvValue(envPath, 'USER_NAME');
  }
  if (!password) {
    password = await getEnvValue(envPath, 'USER_PASSWORD');
  }
  if (!username || !password) {
    console.log('❌ Username or password is not found');
    return AUTHEN_TOKEN;
  }
  try {
    const data = await axios.post('http://localhost:3050/api/auth/login', {
      username,
      password,
    });
    if (data.status === 200) {
      AUTHEN_TOKEN = data.data.token;
    } else {
      console.log('❌ Authentication is failed');
    }
  } catch (e) {
    console.log('Error: ', e);
  }

  return AUTHEN_TOKEN;
};

export const getDeploymentStatus = async () => {
  const result = {
    status: 'UNKNOWN',
    deploy: null,
  };
  const token = await getAuthToken();
  if (!token) {
    throw new Error('❌ Token is not found');
  }
  try {
    const data = await axios.get('http://localhost:3050/api/deploy/status',{
      headers: {
        Authorization: `${token}`,
      },
    });
    if (data.status === 200) {
      result.status = data.data.status;
      result.deploy = data.data.deploy;
    } else {
      console.log('❌ Get deployment status is failed');
    }
  } catch (e) {
    console.log('Error: ', e);
  }

  return result;
};

export const getContainerStatus = async (
  token?: string
): Promise<
  {
    id: string;
    image: string;
    name: string;
    statusText: string;
    status: DockerStatus;
  }[]
> => {
  if (!token) {
    token = await getAuthToken();
  }

  try {
    const data = await axios.get('http://localhost:3050/api/deploy/container', {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (data.status === 200) {
      return data.data;
    } else {
      console.log('❌ Get deployment status is failed');
      return [];
    }
  } catch (e) {
    console.log('Error: ', e);
    return [];
  }
};

export const startAllContainers = async (token?: string) => {
  if (!token) {
    token = await getAuthToken();
  }

  try {
    const data = await axios.post(
      'http://localhost:3050/api/deploy/start',
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (data.status === 200) {
      console.log('✅ Start all containers is successful');
      return data.data;
    } else {
      console.log('❌ Start all containers is failed');
      return false;
    }
  } catch (e) {
    console.log('Error: ', e);
    return false;
  }
};

export const stopAllContainers = async (token?: string) => {
  if (!token) {
    token = await getAuthToken();
  }

  try {
    const data = await axios.post(
      'http://localhost:3050/api/deploy/stop',
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (data.status === 200) {
      console.log('✅ Stop all containers is successful');
      return data.data;
    } else {
      console.log('❌ Stop all containers is failed');
      return false;
    }
  } catch (e) {
    console.log('Error: ', e);
    return false;
  }
};