import path from "path";

export const CONFIG = {
  DEPLOYMENT_REPO: 'https://github.com/zapper-95/optimism-package.git',
  DEPLOYMENT_REPO_VERSION: '1.2.0',
  DEPLOYMENT_REPO_HASH : 'ccd0b8fff9b8c5b63943ccd00d7f1c7d6a287aee',
};

export const WEBSITE = {
  ENDPOINT: "https://uproll-web.vercel.app/api/configs/[id]/yaml/"
}


export const PATH_NAME = {
  DEPLOYMENT_REPO: path.join(path.join(__dirname, '../..'), 'optimism-package'),
  UPROLL_CLI : path.join(__dirname, '../..'),
};
