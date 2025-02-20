import inquirer from 'inquirer';
import { rollupConfigLog , kurtosisRunTestnetLog, deployCompleteLog, deployFailedLog} from '../utils/log';
import { runKurtosisCommand } from '../utils';
import { configToYAML } from '../utils/configtoYAML';
import path from 'path';
import { GetTestnetDetails } from "./get-testnet-details"

export async function RollupdeployCommandCLI(onlyUI = false) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (onlyUI) {
    return;
  }
  console.clear();

  rollupConfigLog();

  // Are you planning on making a devnet or testnet?
  const networkType = await inquirer.prompt(
    [
      {
        type: 'list',
        name: 'networkType',
        message: 'Are you planning on making a devnet or testnet?',
        choices: ['devnet', 'testnet'],
        default:
          'devnet',
      }
    ]
  )

  if (networkType.networkType === "devnet"){
    console.log("Runnning with default devnet config");
  
    // Run Kurtosis using the default devnet config
    let command = runKurtosisCommand(
      'kurtosis',
      [
        'run',
        '.',
        '--args-file',
        path.join(__dirname, '../config/devnet_config.yaml')]
    )
    command.then(
      deployCompleteLog,
      (err) => deployFailedLog(String(err))
    );
  }
  else{ // Testnet
    // Get the testnet details from the user
    let postData: {[key: string]: any};
    try{
      postData = await GetTestnetDetails();
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }

    // Convert the testnet details to a YAML file
    try{
      configToYAML(postData);
    } catch (e) {
      deployFailedLog(String(e));
      return;
    }

    kurtosisRunTestnetLog();

    // Run Kurtosis using the testnet config
    let command =  runKurtosisCommand(
      'kurtosis',
      [
        'run',
        '.',
        '--args-file',
        path.join(__dirname, '../config/' + postData.CONFIG_NAME + '.yaml')]
    );
    command
    .then(
      deployCompleteLog,
      (err) => deployFailedLog(String(err))
    )
  }
}
