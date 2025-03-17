import path from 'path';
import { runCommand } from '../utils';
import { CONFIG, PATH_NAME } from '../utils/config';
import axios from 'axios';
import fs from 'fs';
import inquirer from 'inquirer';



export const getDockerCompose = async () => {
  let dockerCompose = '';
  let isDockerComposeInstalled = false;
  const dockerCompose1Version = await runCommand('docker-compose -v');
  const dockerCompose2Version = await runCommand('docker compose -v');

  if (dockerCompose1Version) {
    dockerCompose = 'docker-compose';
  } else if (dockerCompose2Version) {
    dockerCompose = 'docker compose';
  }

  if (dockerCompose1Version || dockerCompose2Version) {
    isDockerComposeInstalled = true;
  }

  return { dockerCompose, isDockerComposeInstalled };
};



export const getKurtosis = async () => {
  let kurtosis = '';
  let isKurtosisInstalled = false;
  const kurtosis1Version = await runCommand('kurtosis');
  const kurtosis2Version = await runCommand('kurtosis');

  if (kurtosis1Version) {
    kurtosis = 'kurtosis';
  } else if (kurtosis2Version) {
    kurtosis = 'kurtosis';
  }

  if (kurtosis1Version || kurtosis2Version) {
    isKurtosisInstalled = true;
  }

  return { kurtosis, isKurtosisInstalled };
};


async function getRollups(): Promise<string[]> {
  const dirPath = path.join(PATH_NAME.UPROLL_CLI, "dist", "projects");

  try {
    await fs.promises.access(dirPath, fs.constants.F_OK); 
    return await fs.promises.readdir(dirPath);
  } catch {
    return [];
  }
}

const getConfigs = async (projectName: string): Promise<string[]> => {
  const dirPath = path.join(PATH_NAME.UPROLL_CLI, "dist", "projects", projectName);

  try {
    await fs.promises.access(dirPath, fs.constants.F_OK);
    return await fs.promises.readdir(dirPath);
  } catch {
    return [];
  }
};


export const selectRollup = async () => {
  try{
    const rollups = await getRollups();
    if (rollups.length === 0) {
      throw new Error('No rollups found');
    }
  
    // build the rollup options using the found folders in the projects directory
    let rollupsChoices = rollups.map((rollup, index) => (
      {
        name: `${index + 1}) ${rollup}`,
        value: rollup
      }
    
    ));
    const rollupAns = await inquirer.prompt([
      {
        type: 'list',
        name: 'rollup',
        message: 'Select the rollup for chain info',
        choices: rollupsChoices
      }
    ]);
    return rollupAns.rollup;
  }
  catch(err){
    throw err;
  }

}

export const selectRollupConfig = async (rollupName:string) => {
  let configs = await getConfigs(rollupName);

  if (configs.length === 0) {
    throw new Error('No configs found');
  }
  let configChoices = configs.map((config, index) => (
    {
      name: `${index + 1}) ${config}`,
      value: config
    }
  ));

  const configAns = await inquirer.prompt([
    // list choice with description
    {
      type: 'list',
      name: 'config',
      message: '⚙️ Select the config to look up',
      choices: configChoices
    },
  ]);
  return configAns.config;
}

