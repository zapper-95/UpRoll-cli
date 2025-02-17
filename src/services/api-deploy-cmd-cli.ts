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
import inquirer from 'inquirer';
import { createNewEnv } from '../utils';
import path from 'path';
import { loadingBarAnimationInfinite } from '../utils/log';

let kurtosis: string;
const execPromise = promisify(exec);
let check = false;

/**
 * Deploy Rest API
 */
export const apiDeployCmdCli = async () => {
  const kurtosisPath = await getKurtosisPath();
  const envPath = `${kurtosisPath}/.env`;
  const optimsimPackageExists = await fs.pathExists(kurtosisPath);

  //const dockerTest = await getDockerCompose();
  const kurtosisTest = await getKurtosis();
  kurtosis = kurtosisTest.kurtosis;
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
    await git.clone(CONFIG.DEPLOYMENT_REPO, PATH_NAME.DEPLOYMENT_REPO, [
      '--branch',
      CONFIG.DEPLOYMENT_REPO_VERSION,
    ]);
    clearInterval(loading);
  }
  console.log('Project setup complete!');
};
