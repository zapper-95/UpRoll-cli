import { promisify } from 'util';
import { exec, spawn } from 'child_process';
import { PATH_NAME } from './config';

const execPromise = promisify(exec);

export const createNewEnv = (newEnv: Record<string, any>) => {
  let res = '';
  for (const key in newEnv) {
    res += `${key}=${newEnv[key]}\n`;
  }
  return res;
};

export const mergeDict = (dict1: any, dict2: any) => {
  const res = { ...dict1 };
  for (const key in dict2) {
    if (dict2.hasOwnProperty(key)) {
      res[key] = dict2[key];
    }
  }
  return res;
};

export async function runCommand(command: string) {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      // console.error('Error Output:', stderr);
    }
    return stdout;
  } catch (error) {
    // console.error('Command failed:', error);
  }
}


export async function runLongCommand(commandName: string, args:string[]): Promise<string> {

    const command = spawn(
      commandName, 
      args, 
      {
      cwd: "./" + PATH_NAME.DEPLOYMENT_REPO,
      shell: true,
    });

    command.stdout.on('data', output => {
      console.log(output.toString());
    })

    command.stderr.on('data', output => {
      console.log(output.toString());
    })

    return new Promise((resolve, reject) => {
      command.on('close', () => {
        resolve('Command executed successfully');
      });

      command.on('error', (error) => {
        reject(error);
      });
    });

}



export async function runCommandLive(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Using shell mode allows us to pass the whole command string.
    const child = spawn(command, { shell: true });
    let output = '';

    child.stdout.on('data', (data) => {
      const text = data.toString();
      process.stdout.write(text); // Live output to console
      output += text;
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      process.stderr.write(text); // Live error output
      output += text;
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', () => {
      resolve(output);
    });
  });
}

export const consoleLogTable = (data: any[]) => {
  // console.log tha table with key as header and value as row
  const header = Object.keys(data[0]);
  // const rows = data.map((row) => Object.values(row));
  // console.log(header, rows);
  console.table(data, header);
};

export function stripAnsiCodes(str: string) {
  // Regular expression to match ANSI escape codes
  const ansiRegex = /\x1B\[[0-?]*[ -/]*[@-~]/g;
  return str.replace(ansiRegex, '');
}
