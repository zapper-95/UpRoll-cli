import { loadingBarAnimationInfinite } from './log';
import { runKurtosisCommand } from './system';
import { getProjectDeploymentDumpFolder } from './project-manage';


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
  .finally(() => clearInterval(loading))
} 


export async function removeEnclave(projectName: string) {
    // try to remove any existing enclave of the same name
    const loading = loadingBarAnimationInfinite('🚀 Removing existing enclave');
    try{
      await runKurtosisCommand('kurtosis', [
        'enclave',
        'rm',
        projectName,
        "--force",
      ], false);
      console.log("Existing enclave removed");
    }
    finally{
      clearInterval(loading);
    }
  }