import inquirer from 'inquirer';
import { CleanCMDCLI } from './clean-cmd-cli';
import { RollupdeployCommandCLI } from './deploy-cmd-cli/rollup-deploy-cmd-cli';
import { InfoCMDCLI } from './info-cmd-cmd';
import { LogsCmd } from './logs-cmd-cli';
import { StatusCMDCLI } from './status-cmd-cli';
import { StopCMDCLI } from './stop-cmd-cli';
enum Action {
  deployUI = 'deployUI',
  deploy = 'deploy',
  start = 'start',
  stop = 'stop',
  logs = 'logs',
  import = 'import',
  status = 'status',
  backup = 'backup',
  backupConfig = 'backupConfig',
  delete = 'delete',
  chainInfo = 'chainInfo',
  exit = 'exit',
  clean = 'clean',
}

export const mainCMDCLI = async () => {

  // select the command

  const actionAns = await inquirer.prompt([
    // list choice with description
    {
      type: 'list',
      name: 'action',
      message: '🚀 Select the action',
      choices: [
        {
          name: 'Deploy Rollup',
          value: Action.deploy,
        },
        {
          name: 'Stop rollup',
          value: Action.stop,
        },
        // {
        //   name: '5) Import existing OP Stack deployment',
        //   value: Action.import,
        // },
        {
          name: 'Chain Info',
          value: Action.chainInfo,
        },
        {
          name: 'Status of the deployment',
          value: Action.status,
        },
        {
          name: 'View logs',
          value: Action.logs,
        },
        {
          name: 'Clean',
          value: Action.clean,
        },
        // {
        //   name: '9) Backup Config',
        //   value: Action.backupConfig,
        // },
        // {
        //   name: '10) Backup Data Snapshot',
        //   value: Action.backup,
        // },
        // {
        //   name: '11) Delete Chain',
        //   value: Action.delete,
        // },
        {
          name: 'Exit',
          value: Action.exit,
        },
      ],
    },
  ]);

  const action = actionAns.action as Action;

  switch (action) {
    case Action.deploy:
      await RollupdeployCommandCLI();
      break;
    case Action.stop:
      await StopCMDCLI();
      break;
    // case Action.import:
    //   console.log('Importing');
    //   break;
    case Action.chainInfo:
      await InfoCMDCLI();
      break;
    case Action.status:
      await StatusCMDCLI();
      break;
    case Action.logs:
      await LogsCmd();
      break;
    case Action.clean:
      await CleanCMDCLI();
      break;
    // case Action.backupConfig:
    //   console.log('Backup Config');
    //   break;
    // case Action.backup:
    //   console.log('Backup');
    //   break;
    // case Action.delete:
    //   console.log('Delete');
    //   break;
    case Action.exit:
      console.log('Exit');
      break;
  }
};
