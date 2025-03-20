import { colors } from '../utils/colors';
import { getProjectLogFile, readConfigFile, selectLog, selectRollup } from '../utils/project-manage';
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
  const filePath = getProjectLogFile(rollupName, logName);
  const data = await readConfigFile(filePath);

  console.log('------------------');
  console.log(colors.fg.magenta, `${rollupName}➜${logName}`, colors.reset);
  console.log('------------------');
  console.log(data);

}