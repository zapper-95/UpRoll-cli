export const CONFIG = {
  DEPLOYMENT_REPO: 'https://github.com/ethpandaops/optimism-package.git',
  DEPLOYMENT_REPO_VERSION: '1.2.0',
  DEPLOYMENT_REPO_HASH : 'c32a626c575983331c1d4fc52c507588e385ed56',
  DEPLOYMENT_URL: 'http://localhost:3050',
  DEPLOYMENT_WS_URL: 'ws://localhost:3050',
};

export const PATH_NAME = {
  DEPLOYMENT_REPO: 'optimism-package',
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