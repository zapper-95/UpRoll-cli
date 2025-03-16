import inquirer from 'inquirer';
import { colors } from '../utils/colors';
import fs from 'fs';
import util from 'util';
import { PATH_NAME } from '../utils/config';
import path from 'path';
const yaml = require("js-yaml");
var toml = require('toml');


export const InfoCMDCLI = async () => {


  console.clear();
  console.log('------------------');
  console.log(colors.fg.magenta, 'Chain Info', colors.reset);
  console.log('------------------');

  try{
    let rollupName = await selectRollup();
    let rollupConfig = await selectRollupConfig(rollupName);
    await displayConfig(rollupName, rollupConfig);

  }catch(err){
    console.log("❌ Error:", err);
  }

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

export const getConfigs = async (projectName: string): Promise<string[]> => {
  const dirPath = path.join(PATH_NAME.UPROLL_CLI, "dist", "projects", projectName);

  try {
    await fs.promises.access(dirPath, fs.constants.F_OK);
    return await fs.promises.readdir(dirPath);
  } catch {
    return [];
  }
};

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


export const selectRollup = async () => {
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



export const displayConfig = async (rollupName:string, rollupConfig:string) => {
  let filePath = `${PATH_NAME.UPROLL_CLI}/dist/projects/${rollupName}/${rollupConfig}`;
  const data = await readConfigFile(filePath);
  console.log('------------------');
  console.log(colors.fg.magenta, `${rollupName}➜${rollupConfig}`, colors.reset);
  console.log('------------------');
  console.log(data);
};

export const readConfigFile = async (filePath: string) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);

    const data = await fs.promises.readFile(filePath, "utf8");

    if (filePath.endsWith(".json")) {
      return JSON.parse(data);
    } else if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
      return util.inspect(yaml.load(data), { depth: null, colors: true });
    } else if (filePath.endsWith(".toml")) {
      return toml.parse(data);
    } else {
      throw new Error(
        "Invalid file format. Supported formats are JSON, YAML, and TOML."
      );
    }
  } catch {
    throw new Error(`File does not exist or cannot be accessed: ${filePath}`);
  }
};
