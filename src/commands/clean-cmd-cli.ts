import { runKurtosisCommand } from "../utils/system";
import {removeProjectDirectory} from '../utils/project-manage';
export async function CleanCMDCLI(){
    await runKurtosisCommand('kurtosis', ['clean', '-a']);
    await removeProjectDirectory();
}