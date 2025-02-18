import inquirer from 'inquirer';
import axios from 'axios';
import { CONFIG, PATH_NAME } from '../utils/config';
import { colors } from '../utils/colors';
import { loadingBarAnimationInfinite, rollupConfigLog } from '../utils/log';
import { runCommand, runLongCommand } from '../utils';
import { configToYAML } from '../utils/configtoYAML';
import {exec, spawn} from 'child_process';


export async function RollupdeployCommandCLI(onlyUI = false) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (onlyUI) {
    return;
  }
  console.clear();

  rollupConfigLog();
  configToYAML({});
  await runLongCommand(
    'kurtosis',
    [
      'run',
      '.',
      '--args-file',
      './network_params.yaml']
  );


//   // start the `ping google.com` command
//    const command = spawn('kurtosis', [
//     'run',
//     ".",
//     '--args-file',
//     './network_params.yaml'
//   ], {
//     cwd: './optimism-package',
//     shell: true
//   });
//   // the `data` event is fired every time data is
//   // output from the command
//   command.stdout.on('data', output => {
//       // the output data is captured and printed in the callback
//       console.log(output.toString())
// })

// command.stderr.on('data', data => {
//   console.error("Error Output: ", data.toString());
// });

  const configName = await inquirer.prompt([
    {
      type: 'input',
      name: 'configName',
      message: 'Enter the Config Name:',
      validate: (input) => (input ? true : 'Config Name cannot be empty.'),
    },
  ]);

  console.log(colors.fg.yellow, 'Config your Wallet', colors.reset);
  const privateKeyForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'BATCHER_PRIVATE_KEY',
      message: 'Enter the Batcher Private Key:',
      validate: (input) =>
        input ? true : 'Batcher Private Key cannot be empty.',
    },
    {
      type: 'input',
      name: 'PROPOSER_PRIVATE_KEY',
      message: 'Enter the Proposer Private Key:',
      validate: (input) =>
        input ? true : 'Proposer Private Key cannot be empty.',
    },
    {
      type: 'input',
      name: 'SEQUENCER_PRIVATE_KEY',
      message: 'Enter the Sequencer Private Key:',
      validate: (input) =>
        input ? true : 'Sequencer Private Key cannot be empty.',
    },
    {
      type: 'input',
      name: 'DEPLOYER_PRIVATE_KEY',
      message: 'Enter the Deployer Private Key:',
      validate: (input) =>
        input ? true : 'Deployer Private Key cannot be empty.',
    },
    {
      type: 'input',
      name: 'ADMIN_PRIVATE_KEY',
      message: 'Enter the Admin Private Key:',
      validate: (input) =>
        input ? true : 'Admin Private Key cannot be empty.',
    },
  ]);
  console.log(colors.fg.yellow, 'Config your Layer 1', colors.reset);
  const L1Form = await inquirer.prompt([
    {
      type: 'input',
      name: 'L1_RPC_URL',
      message: 'Enter the L1 RPC URL:',
      validate: (input) => (input ? true : 'L1 RPC URL cannot be empty.'),
    },
    {
      type: 'number',
      name: 'L1_CHAIN_ID',
      message: 'Enter the L1 Chain ID:',
      validate: (input) => (input ? true : 'L1 Chain ID cannot be empty.'),
    },
    {
      type: 'input',
      name: 'L1_CHAIN_NAME',
      message: 'Enter the L1 Chain Name:',
      validate: (input) => (input ? true : 'L1 Chain Name cannot be empty.'),
    },
    {
      type: 'input',
      name: 'L1_LOGO_URL',
      message: 'Enter the L1 Logo URL:',
      validate: (input) => (input ? true : 'L1 Logo URL cannot be empty.'),
      default: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      type: 'input',
      name: 'L1_NATIVE_CURRENCY_NAME',
      message: 'Enter the L1 Native Currency Name:',
      validate: (input) =>
        input ? true : 'L1 Native Currency Name cannot be empty.',
      default: 'Ethereum',
    },
    {
      type: 'input',
      name: 'L1_NATIVE_CURRENCY_SYMBOL',
      message: 'Enter the L1 Native Currency Symbol:',
      validate: (input) =>
        input ? true : 'L1 Native Currency Symbol cannot be empty.',
      default: 'ETH',
    },
    {
      type: 'input',
      name: 'L1_NATIVE_CURRENCY_DECIMALS',
      message: 'Enter the L1 Native Currency Decimals:',
      validate: (input) =>
        input ? true : 'L1 Native Currency Decimals cannot be empty.',
      default: '18',
    },
    {
      type: 'input',
      name: 'L1_BLOCK_EXPLORER_URL',
      message: 'Enter the L1 Block Explorer URL:',
      validate: (input) =>
        input ? true : 'L1 Block Explorer URL cannot be empty.',
    },
    {
      type: 'input',
      name: 'L1_BLOCK_EXPLORER_API',
      message: 'Enter the L1 Block Explorer API (can blank):',
    },
    {
      type: 'list',
      name: 'L1_RPC_KIND',
      message: 'Select RPC Kind for L1',
      choices: [
        'alchemy',
        'quicknode',
        'infura',
        'parity',
        'nethermind',
        'debug_geth',
        'erigon',
        'basic',
        'any',
      ],
      default: 'any',
    },
    {
      type: 'input',
      name: 'L1_MULTI_CALL3_ADDRESS',
      message: 'Enter the L1 Multi Call3 Address:',
      validate: (input) =>
        input ? true : 'L1 Multi Call3 Address cannot be empty.',
    },
    {
      type: 'number',
      name: 'L1_MULTI_CALL3_BLOCK_CREATED',
      message: 'Enter the L1 Multi Call3 Block Created:',
      validate: (input) =>
        input ? true : 'L1 Multi Call3 Block Created cannot be empty.',
    },
  ]);

  console.log(colors.fg.yellow, 'Config your Rollup', colors.reset);
  const rollupForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'L2_CHAIN_NAME',
      message: 'Enter the Rollup Name (Chain name):',
      validate: (input) =>
        input ? true : 'Rollup Name (Chain name) cannot be empty.',
    },
    {
      type: 'number',
      name: 'L2_CHAIN_ID',
      message: 'Enter the Rollup Chain ID:',
      validate: (input) => (input ? true : 'Rollup Chain ID cannot be empty.'),
    },
    {
      type: 'input',
      name: 'L2_LOGO_URL',
      message: 'Enter the Rollup Logo URL (default is OP logo):',
      validate: (input) => (input ? true : 'Rollup Logo URL cannot be empty.'),
      default: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
    },
    {
      type: 'input',
      name: 'L2_NATIVE_CURRENCY_NAME',
      message: 'Enter the Rollup Native Currency Name:',
      validate: (input) =>
        input ? true : 'Rollup Native Currency Name cannot be empty.',
      default: 'Optimism Ethereum',
    },
    {
      type: 'input',
      name: 'L2_NATIVE_CURRENCY_SYMBOL',
      message: 'Enter the Rollup Native Currency Symbol:',
      validate: (input) =>
        input ? true : 'Rollup Native Currency Symbol cannot be empty.',
      default: 'ETH',
    },
    {
      type: 'input',
      name: 'L2_NATIVE_CURRENCY_DECIMALS',
      message: 'Enter the Rollup Native Currency Decimals:',
      validate: (input) =>
        input ? true : 'Rollup Native Currency Decimals cannot be empty.',
      default: '18',
    },
    {
      type: 'input',
      name: 'governanceTokenName',
      message: 'Enter the Governance Token Name:',
      validate: (input) =>
        input ? true : 'Governance Token Name cannot be empty.',
    },
    {
      type: 'input',
      name: 'governanceTokenSymbol',
      message: 'Enter the Governance Token Symbol:',
      validate: (input) =>
        input ? true : 'Governance Token Symbol cannot be empty.',
    },
    {
      type: 'number',
      name: 'l2BlockTime',
      message:
        'Number of seconds between each L2 block. Must be < L1 block time:',
      validate: (input) => (input ? true : 'l2BlockTime cannot be empty.'),
      default: 2,
    },
    {
      type: 'number',
      name: 'l2OutputOracleSubmissionInterval',
      message: 'Number of blocks between proposals to the L2OutputOracle:',
      validate: (input) =>
        input ? true : 'l2OutputOracleSubmissionInterval cannot be empty.',
      default: 90,
    },
    {
      type: 'number',
      name: 'finalizationPeriodSeconds',
      message:
        'Number of seconds that a proposal must be available to challenge before it is considered finalized by the OptimismPortal contract:',
      validate: (input) =>
        input ? true : 'l2OutputOracleSubmissionInterval cannot be empty.',
      default: 300,
    },
  ]);

  console.log(
    colors.fg.yellow,
    'Config your bridge user interface',
    colors.reset
  );
  const bridgeUIForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'APP_LOGO',
      message: 'Enter the App Logo URL (default is upnode logo):',
      validate: (input) => (input ? true : 'App Logo URL cannot be empty.'),
      default: 'https://i.ibb.co/r36YpbK/upnode.png',
    },
    // input color
    {
      type: 'input',
      name: 'COLOR_PRIMARY',
      message: 'Enter the Primary Color:',
      validate: (input) => (input ? true : 'Primary Color cannot be empty.'),
      default: '#27005D',
    },
    {
      type: 'input',
      name: 'COLOR_SECONDARY',
      message: 'Enter the Secondary Color:',
      validate: (input) => (input ? true : 'Secondary Color cannot be empty.'),
      default: '#9EDDFF',
    },
    {
      type: 'input',
      name: 'WALLETCONNECT_PROJECT_ID',
      message: 'Enter the WalletConnect Project ID:',
      validate: (input) =>
        input ? true : 'WalletConnect Project ID cannot be empty.',
      default: '00000',
    },
  ]);

  console.log(
    colors.fg.yellow,
    'Config your grafana user and password',
    colors.reset
  );

  const grafanaForm = await inquirer.prompt([
    {
      type: 'input',
      name: 'GF_SECURITY_ADMIN_USER',
      message: 'Enter the Grafana User:',
      validate: (input) => (input ? true : 'Grafana User cannot be empty.'),
    },
    {
      type: 'input',
      name: 'GF_SECURITY_ADMIN_PASSWORD',
      message: 'Enter the Grafana Password:',
      validate: (input) =>
        input ? true : 'Grafana Password cannot be empty.',
    },
  ]);




  const COLOR_PRIMARY = `'${bridgeUIForm.COLOR_PRIMARY}'`;
  const COLOR_SECONDARY = `'${bridgeUIForm.COLOR_SECONDARY}'`;

  const postData: { [key: string]: any } = {
    ... configName,
    ...privateKeyForm,
    ...L1Form,
    ...rollupForm,
    ...bridgeUIForm,
    ...grafanaForm,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
  };
  const { is_correct: confirmPostdata } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'is_correct',
      message: 'Is the above information correct?',
    },
  ]);

  if (!confirmPostdata) {
    console.log(colors.fg.red, 'Please run the command again', colors.reset);
    return;
  }

  // trim if there is string all in the object postData
  for (const key in postData) {
    if (typeof postData[key] === 'string') {
      postData[key] = postData[key].trim();
    }
  }
  configToYAML(postData);

  console.log(postData);
}
