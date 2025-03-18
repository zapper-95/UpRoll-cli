import path from 'path';
import { colors } from '../utils/colors';
import { PATH_NAME } from '../utils/config';
import { readConfigFile, selectLog, selectRollup } from '../utils/project-manage';
import { logCompleteLog, logFailLog } from '../utils/log';

export async function LogsCmd() {
  try{
    const rollupName = await selectRollup();
    const logName  = await selectLog(rollupName);
    await displayLog(rollupName, logName);
    logCompleteLog();
  }
  catch(error){
    logFailLog(String(error));  
  }
}

export async function displayLog(rollupName:string, logName:string){
  const filePath = path.join(PATH_NAME.UPROLL_CLI, "dist", "projects", rollupName, "deployment", logName, "output.log");
  const data = await readConfigFile(filePath);

  console.log('------------------');
  console.log(colors.fg.magenta, `${rollupName}➜${logName}`, colors.reset);
  console.log('------------------');
  console.log(data);

}