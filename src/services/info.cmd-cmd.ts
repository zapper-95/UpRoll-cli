import inquirer from 'inquirer';
import { colors } from '../utils/colors';
import fs from 'fs';
import { PATH_NAME } from '../utils/config';


export const InfoCMDCLI = async () => {


  console.clear();
  // console.log(path)
  console.log('------------------');
  console.log(colors.fg.magenta, 'Chain Info', colors.reset);
  console.log('------------------');

  try{
    let rollupName = await selectRollup();
    let rollupConfig = await selectRollupConfig(rollupName);
    await readConfigJson(rollupName, rollupConfig);

  }catch(err){
    console.log(err);
    return;
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
      return
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
      return
    }
    );

  return configs;
}


export const selectRollupConfig = async (rollupName:string) => {
  let configs = await getConfigs(rollupName);

  if (configs.length === 0) {
    throw new Error('❌ No configs found');
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
  let rollups = await getRollups();
  if (rollups.length === 0) {
    throw new Error('❌ No rollups found');
  }

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



export const readConfigJson = async (rollupName:string, rollupConfig:string) => {
  let filePath = `${PATH_NAME.UPROLL_CLI}/dist/projects/${rollupName}/${rollupConfig}`;

  const data = await readConfigJsonFile(filePath);
  if (!data) {
    console.log('❌ File not found', filePath);
  } else {
    console.log('------------------');
    console.log(colors.fg.magenta, `${rollupName}➜${rollupConfig}`, colors.reset);
    console.log('------------------');
    console.log(data);
  }

};

export const readConfigJsonFile = async (filePath: string) => {
  // read the file and display the content if the file exists
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    await new Promise((resolve) => setTimeout(resolve, 100));

    return JSON.parse(data);
  } catch (error) {
    return undefined;
  }
};
