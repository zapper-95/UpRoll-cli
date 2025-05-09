import fs from 'fs';
import inquirer from 'inquirer';
import yaml from "js-yaml";
import path from 'path';
import toml from 'toml';
import util from 'util';
import { PATH_NAME } from "./config";


export function projectSetUp(){

  fs.mkdirSync(PATH_NAME.UPROLL_CLI, { recursive: true });
  fs.mkdirSync(path.join(PATH_NAME.UPROLL_CLI, "projects"), { recursive: true });
  
  const DEVNET_CONFIGS_SRC = path.join(__dirname, "../../devnet_configs");
  const DEVNET_CONFIGS_DEST = path.join(PATH_NAME.UPROLL_CLI, "devnet_configs");
  
  if (fs.existsSync(DEVNET_CONFIGS_SRC)) {
    fs.cpSync(DEVNET_CONFIGS_SRC, DEVNET_CONFIGS_DEST, { recursive: true, force: true });
  } else {
    console.warn(`Source directory ${DEVNET_CONFIGS_SRC} does not exist.`);
  }
}


export async function createProjectDirectory(projectName: string) {
  const projectPath = await getProjectFolder(projectName);
  await fs.promises.mkdir(projectPath, { recursive: true });
  return projectPath;
}

export async function removeProjectDirectory(projectName: string = "", failSilent:boolean=false) {
  const projectPath = await getProjectFolder(projectName);
  if (failSilent){
    try{
      await fs.promises.access(projectPath, fs.constants.F_OK);
    }
    catch{
      return; // Directory does not exist, fail silently
    }
  }
  await fs.promises.rm(projectPath, { recursive: true });
}

export async function removeUprollDirectory(){
  // Remove the main uproll directory, including all projects and the optimism package
  await fs.promises.rm(PATH_NAME.UPROLL_CLI, { recursive: true });
}



async function getRollups(): Promise<string[]> {
  const projectsPath = await getProjectFolder();
  try {
    await fs.promises.access(projectsPath, fs.constants.F_OK); 
    return await fs.promises.readdir(projectsPath);
  } catch {
    return [];
  }
}

const getConfigs = async (projectName: string): Promise<string[]> => {
  const dirPath = await getProjectDeployerFile(projectName, "");
  try {
    await fs.promises.access(dirPath, fs.constants.F_OK);
    return await fs.promises.readdir(dirPath);
  } catch {
    return [];
  }
};


export const getLogs = async (projectName: string): Promise<string[]> => {

  const baseDir = await getProjectLogFile(projectName, "");
  // return a list of all subdirectories in the deployment directory
  try {
    await fs.promises.access(baseDir, fs.constants.F_OK);
    return await fs.promises.readdir(baseDir);
  } catch {
    return [];
  }
};


export const selectRollup = async () => {
    const rollups = await getRollups();
    if (rollups.length === 0) {
      throw new Error('No rollups found');
    }
  
    // build the rollup options using the found folders in the projects directory
    const rollupsChoices = rollups.map((rollup, index) => (
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

export const selectRollupConfig = async (rollupName:string) => {
  const configs = await getConfigs(rollupName);

  if (configs.length === 0) {
    throw new Error('No configs found');
  }
  const configChoices = configs.map((config, index) => (
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


export const selectLog = async (rollupName:string) => {
  const logs = await getLogs(rollupName);
  if (logs.length === 0) {
    throw new Error('No logs found');
  }
  const logChoices = logs.map((log, index) => (
    {
      name: `${index + 1}) ${log}`,
      value: log
    }
  ));

  const logAns = await inquirer.prompt([
    // list choice with description
    {
      type: 'list',
      name: 'log',
      message: '📜 Select the log to view',
      choices: logChoices
    },
  ]);
  return logAns.log;
}

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
      return data;
    }
  } catch(error) {
    throw new Error(`Error reading file: ${error}`);
  }
};


export const getProjectFolder = (rollupFolder:string= "") =>{
  return path.join(PATH_NAME.PROJECTS, rollupFolder);
}

export const getDevnetConfig = (configName:string) =>{
  return path.join(PATH_NAME.DEVNET_CONFIGS, `${configName}.yaml`);
}

export const getProjectConfig =  (rollupFolder:string) =>{
  return path.join(PATH_NAME.PROJECTS, rollupFolder, "config.yaml");
}

export const getProjectDeployerFile =  (rollupFolder:string, file:string = "") =>{
  return path.join(PATH_NAME.PROJECTS, rollupFolder, "deployment", "files", "op-deployer-configs", file);
}

export const getProjectLogFile = (rollupFolder:string, logFolder:string = "") =>{
  const dirPath = path.join(PATH_NAME.PROJECTS, rollupFolder, "deployment");
  if (logFolder === ""){
    return dirPath;
  }
  return path.join(dirPath, logFolder, "output.log");

}

export const getProjectDeploymentDumpFolder =  (rollupFolder: string) =>{
  return path.join(PATH_NAME.PROJECTS, rollupFolder, "deployment");
}


