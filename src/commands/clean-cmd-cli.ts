import { runKurtosisCommand } from "../utils/system";
import {removeUprollDirectory} from '../utils/project-manage';
export async function CleanCMDCLI(){
    await runKurtosisCommand('kurtosis', ['clean', '-a']);
    await removeUprollDirectory();
}