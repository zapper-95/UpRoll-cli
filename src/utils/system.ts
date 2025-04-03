import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import { PATH_NAME } from './config';

const execPromise = promisify(exec);

export async function runCommand(command: string) {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error('Error Output:', stderr);
    }
    return stdout;
  } catch (error) {
    console.error('Command failed:', error);
  }
}

export function runKurtosisCommand(commandName: string, args:string[], displayErrors=true){
    
    const command = spawn(
      commandName, 
      args, 
      {
      cwd: PATH_NAME.UPROLL_CLI,
      shell: true,
    });

    command.stdout.on('data', output => {
      console.log(output.toString());
    })

    if (displayErrors){
      command.stderr.on('data', output => {
        console.error(output.toString());
      })
    }

    return new Promise((resolve, reject) => {
      command.on('error', (err) => {
        console.error('Failed to start command:', err);
        reject(err);
      });
  
      command.on('close', (code) => {
        
        if (code === 0){
          resolve('Command executed successfully');
        }
        else {
          reject(new Error('Command failed while running'));
        }
      })
    });

}

export const getDockerCompose = async () => {
  let dockerCompose = '';
  let isDockerComposeInstalled = false;
  const dockerCompose1Version = await runCommand('docker-compose -v');
  const dockerCompose2Version = await runCommand('docker compose -v');

  if (dockerCompose1Version) {
    dockerCompose = 'docker-compose';
  } else if (dockerCompose2Version) {
    dockerCompose = 'docker compose';
  }

  if (dockerCompose1Version || dockerCompose2Version) {
    isDockerComposeInstalled = true;
  }

  return { dockerCompose, isDockerComposeInstalled };
};



export const getKurtosis = async () => {
  let kurtosis = '';
  let isKurtosisInstalled = false;
  const kurtosis1Version = await runCommand('kurtosis');
  const kurtosis2Version = await runCommand('kurtosis');

  if (kurtosis1Version) {
    kurtosis = 'kurtosis';
  } else if (kurtosis2Version) {
    kurtosis = 'kurtosis';
  }

  if (kurtosis1Version || kurtosis2Version) {
    isKurtosisInstalled = true;
  }

  return { kurtosis, isKurtosisInstalled };
};

export function delay(ms:number){
  return new Promise(resolve => setTimeout(resolve, ms));
}