import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import util from 'util';
import { PATH_NAME } from "./config";
import yaml from "js-yaml";
import toml from 'toml';
import { loadingBarAnimationInfinite } from './log';
import { runKurtosisCommand } from './system';

export async function ensureProjectDirectory(projectName: string) {
  const projectPath = await getProjectFolder(projectName);
  await fs.promises.mkdir(projectPath, { recursive: true });
  return projectPath;
}

export async function removeProjectDirectory(projectName: string = ""){
  const projectPath = await getProjectFolder(projectName);
    await fs.promises.rm(projectPath, { recursive: true });
}

export async function removeUprollDirectory(){
  // Remove the main uproll directory, including all projects and the optimism package
  await fs.promises.rm(PATH_NAME.UPROLL_CLI, { recursive: true });
}


export async function saveChainInfo(projectName:string){
  const loading = loadingBarAnimationInfinite(
    '🚀 Downloading deployment information'
  );

  const dumpPath = getProjectDeploymentDumpFolder(projectName); 
  return runKurtosisCommand("kurtosis", [
    'enclave',
    'dump',
    projectName,
    dumpPath,
  ])
  .then(() => clearInterval(loading))
} 

export async function overwriteExistingEnclave(projectName: string) {
    // try to remove any existing enclave of the same name
    const loading = loadingBarAnimationInfinite('🚀 Removing existing enclaves with the same project name');
    try{
      await runKurtosisCommand('kurtosis', [
        'enclave',
        'rm',
        projectName,
        "--force",
      ], false);
      console.log("Existing enclave removed");
    }
    catch {
      console.log("No existing enclaves found");     
    }
    finally{
      clearInterval(loading);
    }
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


