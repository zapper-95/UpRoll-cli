import { colors } from '../utils/colors';
import { logFailure, logSuccess } from '../utils/log';
import { getProjectLogFile, readConfigFile, selectLog, selectRollup } from '../utils/project-manage';

export async function LogsCmd() {
  try{
    const rollupName = await selectRollup();
    const logName  = await selectLog(rollupName);
    await displayLog(rollupName, logName);
    logSuccess(`Log for ${rollupName}➜${logName} displayed successfully.`);
  }
  catch(error){
    logFailure("Failed to get rollup log",String(error));  
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