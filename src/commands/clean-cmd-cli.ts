import { cleanFailLog, cleanSuccesLog } from "../utils/log";
import { removeUprollDirectory } from '../utils/project-manage';
import { runKurtosisCommand } from "../utils/system";
import { loadingBarAnimationInfinite } from '../utils/log';

export async function CleanCMDCLI(){
    const loading = loadingBarAnimationInfinite('🚀 Cleaning Rollups');
    try{
        await runKurtosisCommand('kurtosis', ['clean', '-a']);
        await removeUprollDirectory();
        cleanSuccesLog();
    }
    catch(err){
        cleanFailLog(String(err));
    }
    finally{
        clearInterval(loading);
    }

}