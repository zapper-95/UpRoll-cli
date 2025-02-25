import inquirer from 'inquirer';
import { colors } from '../utils/colors';
import fs from 'fs';
import { PATH_NAME } from '../utils/config';
import yaml from 'yaml';
import toml from 'toml';
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


export const getRollups = async () => {
  let rollups: string[] = []

  await fs.promises.readdir(PATH_NAME.UPROLL_CLI + "/dist/projects")
    .then(
      (files) => {
        rollups = files;
      }
    )
    .catch((err) => {
      console.log(err);
    }
    );

  return rollups;
}

export const getConfigs = async (projectName:string) => {
  let configs: string[] = []

  await fs.promises.readdir(PATH_NAME.UPROLL_CLI + "/dist/projects/" + projectName)
    .then(
      (files) => {
        configs = files;
      }
    )
    .catch((err) => {
      console.log(err);
    }
    );

  return configs;
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
  // read the file and display the content if the file exists
    const data = await fs.promises.readFile(filePath, 'utf8');

    // parse the file based on its extension
    if (filePath.endsWith('.json')) {
      return JSON.parse(data);
    }
    else if (filePath.endsWith('.yaml')) {
      return yaml.parse(data);
    }
    else if (filePath.endsWith('.toml')) {
      return toml.parse(data);
    }
    else{
      throw new Error('Invalid file format. Supported formats are json, yaml, toml');
    }
};
