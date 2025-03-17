import { exec } from 'child_process';
import {
  getKurtosis,
  getKurtosisPath
} from '../shared';
import fs from 'fs-extra';
import { colors } from '../utils/colors';
import { promisify } from 'util';
import {
  CONFIG,
  PATH_NAME,
} from '../utils/config';
import simpleGit from 'simple-git';
import { loadingBarAnimationInfinite } from '../utils/log';

let kurtosis: string;
const execPromise = promisify(exec);
let check = false;

/**
 * Deploy Rest API
 */
export const apiDeployCmdCli = async () => {
  const optimsimPackageExists = await fs.pathExists(PATH_NAME.DEPLOYMENT_REPO);

  const kurtosisTest = await getKurtosis();
  if (!kurtosisTest.isKurtosisInstalled) {
    console.log(colors.fg.red, 'Kurtosis is not installed', colors.reset);
    return;
  }

  if (optimsimPackageExists){
    console.log("Optimism package is already installed");
  }
  else{
    console.log(`Cloning Deployment Repository...`);

    const loading = loadingBarAnimationInfinite(
      '🚀 Cloning optimism-package repository'
    );
    const git = simpleGit();

    // Clone the repo to your desired directory
    await git.clone(CONFIG.DEPLOYMENT_REPO, PATH_NAME.DEPLOYMENT_REPO);

    // Now, create a new git instance that points to the cloned repo
    const repoGit = simpleGit(PATH_NAME.DEPLOYMENT_REPO);
    
    // Checkout the specific commit
    await repoGit.checkout(CONFIG.DEPLOYMENT_REPO_HASH);
    
    clearInterval(loading);
  }
  console.log('Project setup complete!');
};
