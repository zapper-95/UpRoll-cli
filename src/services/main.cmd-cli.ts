import inquirer from 'inquirer';
import { RollupdeployCommandCLI } from './rollup-deploy-cmd-cli';
import { apiDeployCmdCli } from './api-deploy-cmd-cli';
import { InfoCMDCLI } from './info.cmd-cmd';
import { LogsCmd } from './logs-cmd-cli';
import { StatusCMDCLI } from './status-cmd-cli';
import { StartCMDCLI } from './start-cmd-cli';
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
}

export const mainCMDCLI = async () => {
  await apiDeployCmdCli();
  // select the command

  const actionAns = await inquirer.prompt([
    // list choice with description
    {
      type: 'list',
      name: 'action',
      message: '🚀 Select the action',
      choices: [
        {
          name: 'Launch Deployment UI',
          value: Action.deployUI,
        },
        {
          name: 'Deploy Opstack Rollup include (Deployment UI, Grafana, Blockscout, Bridge UI)',
          value: Action.deploy,
        },
        {
          name: 'Start the deployment',
          value: Action.start,
        },
        {
          name: 'Stop the deployment',
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
          name: 'Status of Rollups',
          value: Action.status,
        },
        {
          name: 'View logs',
          value: Action.logs,
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
    case Action.deployUI:
      await RollupdeployCommandCLI(true);
      break;
    case Action.deploy:
      await RollupdeployCommandCLI(false);
      break;
    case Action.start:
      await StartCMDCLI();
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
