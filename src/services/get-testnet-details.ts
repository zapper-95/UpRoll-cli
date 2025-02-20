import { colors } from '../utils/colors';
import inquirer from "inquirer";
export async function  GetTestnetDetails(): Promise<{[key: string]: any}>{
    const configForm = await inquirer.prompt([
        {
          type: 'input',
          name: 'CONFIG_NAME',
          message: 'Enter the Config Name:',
          validate: (input) => (input ? true : 'Config Name cannot be empty.'),
        },
      ]);
      
    
      console.log(colors.fg.yellow, 'Config your Layer 1', colors.reset);
      const L1Form = await inquirer.prompt([

        {
          type: 'input',
          name: 'L1_NETWORK_ID',
          message: 'Enter the L1 Network ID:',
          validate: (input) => (input ? true : 'Network ID cannot be empty.'),
          default: '315908',
        },
        {
          type: 'list',
          name: 'L1_RPC_KIND',
          message: 'Select RPC Kind for L1',
          choices: [
            'standard',
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
          default: 'standard',
        },   
        {
          type: 'input',
          name: 'L1_EL_RPC_URL',
          message: 'Enter the L1 Execution Layer RPC URL:',
          validate: (input) => (input ? true : 'L1 Execution Layer RPC URL cannot be empty.'),
          default: 'http://el-1-geth-lighthouse:8545'
        },
        {
          type: 'input',
          name: 'L1_EL_WS_URL',
          message: 'Enter the L1 WebSocket URL:',
          validate: (input) => (input ? true : 'L1 WebSocket URL cannot be empty.'),
          default: 'ws://el-1-geth-lighthouse:8546',
        },
        {
          type: 'input',
          name: 'L1_CL_RPC_URL',
          message: 'Enter the L1 Consensus Layer RPC URL:',
          validate: (input) => (input ? true : 'L1 Consensus Layer RPC URL cannot be empty.'),
          default: 'http://cl-1-lighthouse-geth:4000',
        },
        {
          type: 'input',
          name: 'L1_PRIVATE_KEY',
          message: 'Enter the L1 Private Key:',
          validate: (input) => (input ? true : 'L1 Private Key cannot be empty.'),
          default: '0xbcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31'
        },
      ]);
    
      console.log(colors.fg.yellow, 'Config your Rollup', colors.reset);
      const rollupForm = await inquirer.prompt([
        {
          type: 'input',
          name: 'L2_NAME',
          message: 'Enter the Rollup Name:',
          validate: (input) =>
            input ? true : 'Rollup Name cannot be empty.',
          default: 'op-kurtosis'
        },
        {
          type: 'number',
          name: 'L2_NETWORK_ID',
          message: 'Enter the Rollup Network ID:',
          validate: (input) => (input ? true : 'Rollup Network ID cannot be empty.'),
          default: 2151908,
        },
        {
          type: 'number',
          name: 'L2_SECONDS_PER_SLOT',
          message:
            'Number of seconds between each L2 block. Must be < L1 block time:',
          validate: (input) => (input ? true : 'Rollup seconds per slot cannot be empty.'),
          default: 2,
        },
      ]);

      console.log(colors.fg.yellow, 'Config Privileged Accounts', colors.reset);
      const privilegedAccounts = await inquirer.prompt([
        // Batcher prompts
        {
          type: 'list',
          name: 'BATCHER_KIND',
          message: 'Select the Batcher Kind',
          choices: ['signer', 'private_key'],
          default: 'private_key',
        },
        {
          type: 'input',
          name: 'BATCHER_SIGNER_ADDRESS',
          message: 'Enter the L2 Privileged Batcher Signer Address:',
          validate: (input) => (input ? true : 'Batcher Signer Address cannot be empty.'),
          when: (answers) => answers.BATCHER_KIND === 'signer',
        },
        {
          type: 'input',
          name: 'BATCHER_SIGNER_ENDPOINT',
          message: 'Enter the batcher signer endpoint:',
          validate: (input) => (input ? true : 'Batcher signer endpoint cannot be empty.'),
          when: (answers) => answers.BATCHER_KIND === 'signer',
        },
        {
          type: 'input',
          name: 'BATCHER_PRIVATE_KEY',
          message: 'Enter the Batcher Private Key:',
          validate: (input) => (input ? true : 'Batcher Private Key cannot be empty.'),
          when: (answers) => answers.BATCHER_KIND === 'private_key',
        },
        // Challenger prompts
        {
          type: 'list',
          name: 'CHALLENGER_KIND',
          message: 'Select the Challenger Kind',
          choices: ['signer', 'private_key'],
          default: 'private_key',
        },
        {
          type: 'input',
          name: 'CHALLENGER_SIGNER_ADDRESS',
          message: 'Enter the L2 Privileged Challenger Signer Address:',
          validate: (input) =>
            input ? true : 'Challenger Signer Address cannot be empty.',
          when: (answers) => answers.CHALLENGER_KIND === 'signer',
        },
        {
          type: 'input',
          name: 'CHALLENGER_SIGNER_ENDPOINT',
          message: 'Enter the challenger signer endpoint:',
          validate: (input) =>
            input ? true : 'Challenger signer endpoint cannot be empty.',
          when: (answers) => answers.CHALLENGER_KIND === 'signer', 
        },
        {
          type: 'input',
          name: 'CHALLENGER_PRIVATE_KEY',
          message: 'Enter the Challenger Private Key:',
          validate: (input) =>
            input ? true : 'Challenger Private Key cannot be empty.',
          when: (answers) => answers.CHALLENGER_KIND === 'private_key',
        },

        // ask if the proposer is a signer or private key
        {
          type: 'list',
          name: 'PROPOSER_KIND',
          message: 'Select the Proposer Kind',
          choices: ['signer', 'private_key'],
          default: 'private_key',
        },
        {
          type: 'input',
          name: 'PROPOSER_SIGNER_ADDRESS',
          message: 'Enter the L2 Privileged Proposer Signer Address:',
          validate: (input) => (input ? true : 'Proposer Signer Address cannot be empty.'),
          when: (answers) => answers.PROPOSER_KIND === 'signer',
        },
        {
          type: 'input',
          name: 'PROPOSER_SIGNER_ENDPOINT',
          message: 'Enter the proposer signer endpoint:',
          validate: (input) => (input ? true : 'Proposer signer endpoint cannot be empty.'),
          when: (answers) => answers.PROPOSER_KIND === 'signer',
        },
        {
          type: 'input',
          name: 'PROPOSER_PRIVATE_KEY',
          message: 'Enter the Proposer Private Key:',
          validate: (input) => (input ? true : 'Proposer Private Key cannot be empty.'),
          when: (answers) => answers.PROPOSER_KIND === 'private_key',
        },
      ]);

      console.log(
        colors.fg.yellow,
        'Config your grafana user and password',
        colors.reset
      );
      const grafanaForm = await inquirer.prompt([

        {
          type: 'confirm',
          name: 'USE_GRAFANA',
          message: 'Do you want to use Grafana? (yes/no)',
          default: false,
        },
        {
          type: 'input',
          name: 'GRAFANA_DASHBOARD_SOURCE',
          message: 'Enter your dashboard source:',
          validate: (input) => (input ? true : 'Grafana dashboard source cannot be empty.'),
          when: (answers) => answers.USE_GRAFANA,
        },
      ]);

    
      const postData: { [key: string]: any } = {
        ... configForm,
        ...L1Form,
        ...rollupForm,
        ...privilegedAccounts,
        ...grafanaForm,
      };
      console.log(colors.fg.blue, '\n====================================', colors.reset);
      const { is_correct: confirmPostdata } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'is_correct',
          message: 'Is all the above information correct?',
        },
      ]);
      
      if (!confirmPostdata) {
        console.log(colors.fg.red, 'Please run the command again', colors.reset);
        throw new Error('User did not confirm the data');
      }
    
      // trim if there is string all in the object postData
      for (const key in postData) {
        if (typeof postData[key] === 'string') {
          postData[key] = postData[key].trim();
        }
      }   
      return postData;
}