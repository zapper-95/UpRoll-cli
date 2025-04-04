import { logSuccess, logFailure } from "../utils/log";
import { removeUprollDirectory } from '../utils/project-manage';
import { runKurtosisCommand } from "../utils/system";
import { loadingBarAnimationInfinite } from '../utils/log';

export async function CleanCMDCLI(){
    const loading = loadingBarAnimationInfinite('🚀 Cleaning Rollups');
    try{
        await runKurtosisCommand('kurtosis', ['clean', '-a']);
        await removeUprollDirectory();
        logSuccess("All rollups have been cleaned successfully.");
    }
    catch(err){
        logFailure("Failed to clean rollups.", String(err));
    }
    finally{
        clearInterval(loading);
    }

}