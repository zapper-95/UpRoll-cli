
import {runCommand} from '../utils';

export const StatusCMDCLI = async () => {
  // TODO: Only include enclaves that have a corresponding project name
  let cmdOut = await runCommand("kurtosis enclave ls");
  
  console.log(cmdOut);  
  return;
};
