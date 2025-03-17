import inquirer from 'inquirer';
import { colors } from '../utils/colors';
import fs from 'fs';
import util from 'util';
import { PATH_NAME } from '../utils/config';
import { selectRollup, selectRollupConfig } from '../shared';
import { infoFailLog, infoCompleteLog } from '../utils/log';
import { info } from 'console';
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
    infoCompleteLog();

  }catch(err){
    infoFailLog(String(err));
  }

};



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
