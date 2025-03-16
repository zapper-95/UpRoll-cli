import path from "path";

export const CONFIG = {
  DEPLOYMENT_REPO: 'https://github.com/zapper-95/optimism-package.git',
  DEPLOYMENT_REPO_VERSION: '1.2.0',
  DEPLOYMENT_REPO_HASH : '20d6b94cab6d98454514c4915b85fad826debe50',
  DEPLOYMENT_URL: 'http://localhost:3050',
  DEPLOYMENT_WS_URL: 'ws://localhost:3050',
};

export const PATH_NAME = {
  DEPLOYMENT_REPO: path.join(path.join(__dirname, '../..'), 'optimism-package'),
  UPROLL_CLI : path.join(__dirname, '../..'),
};

export const ENV_DEPLOYMENT_REPO_DEFAULT = {
  USER_NAME: '',
  USER_PASSWORD: '',
  JWT_SECRET: '',

  // database
  POSTGRES_USER: '',
  POSTGRES_PASSWORD: '',
  POSTGRES_DB: 'mydatabase',

  // domain
  DOMAIN_NAME: 'localhost',
  PROTOCOL: 'http',
};

export const DOCKER_COMPOSE_SERVICE = {
  api: {
    backend: 'backend-main',
  },
};

export const ContainerServiceList = [
  {
    name: 'backend-main',

  }
]