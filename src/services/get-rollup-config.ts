import inquirer from "inquirer";
import { colors } from "../utils/colors";

export async function GetRollupConfig(): Promise<{ [key: string]: any }> {
  let postData: { [key: string]: any } = {};

  // Rollup Name
  console.log(colors.fg.yellow, "Configure Rollup", colors.reset);
  const { rollupName } = await inquirer.prompt([
    {
      type: "input",
      name: "rollupName",
      message: "Enter the Rollup Name:",
      validate: (input) => (input ? true : "Rollup Name cannot be empty."),
      default: "op-kurtosis",
    },
  ]);
  postData.ROLLUP_NAME = rollupName;

  // Level 1
  console.log(colors.fg.yellow, "Select Settlement Layer", colors.reset);
  const { settlementLayer } = await inquirer.prompt([
    {
      type: "list",
      name: "settlementLayer",
      message: "Select a Settlement Layer:",
      choices: ["ETH Mainnet", "ETH Sepolia", "Custom"],
      default: "ETH Mainnet",
    },
  ]);
  postData.SETTLEMENT_LAYER = settlementLayer;

  if (settlementLayer === "Custom") {
    const customSettlement = await inquirer.prompt([
      {
        type: "input",
        name: "customChainId",
        message: "Enter the Custom Chain ID:",
        validate: (input) => (input ? true : "Chain ID cannot be empty."),
      },
      {
        type: "input",
        name: "customL1BlockTime",
        message: "Enter the L1 Block Time:",
        validate: (input) => (input ? true : "L1 Block Time cannot be empty."),
      },
    ]);
    postData.CUSTOM_CHAIN_ID = customSettlement.customChainId;
    postData.CUSTOM_L1_BLOCK_TIME = customSettlement.customL1BlockTime;
  }

  const {el_rpc_url} = await inquirer.prompt([
    {
      type: "input",
      name: "el_rpc_url",
      message: "Enter the EL RPC URL:",
      validate: (input) => (input ? true : "EL RPC URL cannot be empty."),
    },
  ]);

  // ask do you want to use the same url for ws and cl
  const {useSameUrl} = await inquirer.prompt([
    {
      type: "confirm",
      name: "useSameUrl",
      message: "Do you want to use the same URL for EL WS and CL RPC?",
      default: true,
    },
  ]);
  postData.L1_EL_RPC_URL = el_rpc_url;

  if (useSameUrl) {
    postData.L1_WS_URL = el_rpc_url;
    postData.L1_CL_RPC_URL = el_rpc_url;
  }
  else {
    const {el_ws_url} = await inquirer.prompt([
      {
        type: "input",
        name: "el_ws_url",
        message: "Enter the EL WS URL:",
        validate: (input) => (input ? true : "EL WS URL cannot be empty."),
      },
    ]);
    const {cl_rpc_url} = await inquirer.prompt([
      {
        type: "input",
        name: "cl_rpc_url",
        message: "Enter the CL RPC URL:",
        validate: (input) => (input ? true : "CL RPC URL cannot be empty."),
      },
    ]);
    postData.L1_WS_URL = el_ws_url;
    postData.L1_CL_RPC_URL = cl_rpc_url;
  }

  // rpc kind is alchemy if contains .alchemy or .quicknode if contains .quicknode
  if (el_rpc_url.includes(".alchemy")) {
    postData.L1_RPC_KIND = "alchemy";
  } else if (el_rpc_url.includes(".quicknode")) {
    postData.L1_RPC_KIND = "quicknode";
  } else {
    postData.L1_RPC_KIND = "basic";
  }


  // Participants
  console.log(colors.fg.yellow, "Configure Participants", colors.reset);
  const participants: any[] = [];
  // Add default participant: op-geth with op-node
  participants.push({ executionClient: "op-geth", consensusClient: "op-node" });
  console.log(
    colors.fg.blue,
    "Default participant added: op-geth with op-node",
    colors.reset
  );
  let adding = true;
  while (adding) {
    const { addParticipant } = await inquirer.prompt([
      {
        type: "confirm",
        name: "addParticipant",
        message: "Would you like to add another participant?",
        default: false,
      },
    ]);
    if (!addParticipant) {
      adding = false;
    } else {
      const participant = await inquirer.prompt([
        {
          type: "input",
          name: "executionClient",
          message: "Enter the execution client (default: op-geth):",
          default: "op-geth",
        },
        {
          type: "input",
          name: "consensusClient",
          message: "Enter the consensus client (default: op-node):",
          default: "op-node",
        },
      ]);
      participants.push(participant);
    }
  }
  postData.PARTICIPANTS = participants;

  // Signer Configuration
  console.log(colors.fg.yellow, "Signer Configuration", colors.reset);

  // Deployer Private Key
  const { deployerPrivateKey } = await inquirer.prompt([
    {
      type: "input",
      name: "deployerPrivateKey",
      message: "Enter the Deployer Private Key:",
      validate: (input) => (input ? true : "Deployer Private Key cannot be empty."),
    },
  ]);
  postData.DEPLOYER_PRIVATE_KEY = deployerPrivateKey;

  // Helper function for signer config (for Batcher, Sequencer, Proposer)
  async function getSignerConfig(role: string): Promise<{ [key: string]: any }> {
    const config: { [key: string]: any } = {};
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `Select ${role} configuration:`,
        choices: ["Private Key", "Signer Endpoint"],
        default: "Private Key",
      },
    ]);
    if (choice === "Private Key") {
      const { privateKey } = await inquirer.prompt([
        {
          type: "input",
          name: "privateKey",
          message: `Enter the ${role} Private Key:`,
          validate: (input) => (input ? true : `${role} Private Key cannot be empty.`),
        },
      ]);
      config[`${role.toUpperCase()}_PRIVATE_KEY`] = String(privateKey);
    } else {
      const signerConfig = await inquirer.prompt([
        {
          type: "input",
          name: "signerAddress",
          message: `Enter the ${role} Signer Address:`,
          validate: (input) => (input ? true : `${role} Signer Address cannot be empty.`),
        },
        {
          type: "input",
          name: "signerEndpoint",
          message: `Enter the ${role} Signer Endpoint:`,
          validate: (input) => (input ? true : `${role} Signer Endpoint cannot be empty.`),
        },

      ]);
      config[`${role.toUpperCase()}_SIGNER_ADDRESS`] = String(signerConfig.signerAddress);
      config[`${role.toUpperCase()}_SIGNER_ENDPOINT`] = String(signerConfig.signerEndpoint);
    }
    return config;
  }

  const batcherConfig = await getSignerConfig("Batcher");
  const sequencerConfig = await getSignerConfig("Sequencer");
  const proposerConfig = await getSignerConfig("Proposer");
  postData = Object.assign(postData, batcherConfig, sequencerConfig, proposerConfig);

  // Admin Configuration
  console.log(colors.fg.yellow, "Admin Configuration", colors.reset);
  const adminConfig = await inquirer.prompt([
    {
      type: "input",
      name: "l1SystemAdmin",
      message: "Enter the L1 System Admin (finalSystemOwner):",
      validate: (input) => (input ? true : "L1 System Admin cannot be empty."),
    },
    {
      type: "input",
      name: "l2ProxyAdmin",
      message: "Enter the L2 Proxy Admin (proxyAdminOwner):",
      validate: (input) => (input ? true : "L2 Proxy Admin cannot be empty."),
    },
  ]);
  postData.FINAL_SYSTEM_OWNER = adminConfig.l1SystemAdmin;
  postData.PROXY_ADMIN_OWNER = adminConfig.l2ProxyAdmin;

  // Chain Configuration
  console.log(colors.fg.yellow, "Chain Configuration", colors.reset);
  const chainConfig = await inquirer.prompt([
    {
      type: "number",
      name: "l2ChainID",
      message: "Enter the L2 Chain ID:",
      validate: (input) => (input ? true : "L2 Chain ID cannot be empty."),
    },
    {
      type: "number",
      name: "l2BlockTime",
      message: "Enter the L2 Block Time (in seconds):",
      default: 2,
      validate: (input) => (input ? true : "L2 Block Time cannot be empty."),
    },
    {
      type: "number",
      name: "proofMaturityDelaySeconds",
      message: "Enter the Withdrawal Delay (proofMaturityDelaySeconds):",
      validate: (input) => (input ? true : "Withdrawal Delay cannot be empty."),
    },
  ]);

  console.log(colors.fg.yellow, "Fee Withdrawal Networks", colors.reset);
  const feeWithdrawalNetworks = await inquirer.prompt([
    {
      type: "list",
      name: "baseFeeVaultWithdrawalNetwork",
      message: "Select the nçetwork for Base Fee Vault Withdrawal (L1 or L2):",
      choices: ["L1", "L2"],
      default: "L1",
    },
    {
      type: "list",
      name: "l1FeeVaultWithdrawalNetwork",
      message: "Select the network for L1 Fee Vault Withdrawal (L1 or L2):",
      choices: ["L1", "L2"],
      default: "L1",
    },
    {
      type: "list",
      name: "sequencerFeeVaultWithdrawalNetwork",
      message: "Select the network for Sequencer Fee Vault Withdrawal (L1 or L2):",
      choices: ["L1", "L2"],
      default: "L1",
    },
  ]);
  
  postData.L2_CHAIN_ID = chainConfig.l2ChainID;
  postData.L2_BLOCK_TIME = chainConfig.l2BlockTime;
  postData.PROOF_MATURITY_DELAY_SECONDS = chainConfig.proofMaturityDelaySeconds;
  postData.BASE_FEE_VAULT_RECIPIENT =  feeWithdrawalNetworks.baseFeeVaultWithdrawalNetwork;
  postData.L1_FEE_VAULT_RECIPIENT = feeWithdrawalNetworks.l1FeeVaultWithdrawalNetwork;
  postData.SEQUENCER_FEE_VAULT_RECIPIENT = feeWithdrawalNetworks.sequencerFeeVaultWithdrawalNetwork;


  // Gas Configuration
  console.log(colors.fg.yellow, "Gas Configuration", colors.reset);
  const gasConfig = await inquirer.prompt([
    {
      type: "number",
      name: "l2GenesisBlockGasLimit",
      message: "Enter the Block Gas Limit (l2GenesisBlockGasLimit):",
      validate: (input) => (input ? true : "Block Gas Limit cannot be empty."),
    },
    {
      type: "number",
      name: "eip1559Elasticity",
      message: "Enter the EIP 1559 Elasticity:",
      validate: (input) => (input ? true : "EIP 1559 Elasticity cannot be empty."),
    },
    {
      type: "number",
      name: "eip1559Denominator",
      message:
        "Enter the EIP 1559 Denominator (applies to both eip1559Denominator and eip1559DenominatorCanyon):",
      validate: (input) => (input ? true : "EIP 1559 Denominator cannot be empty."),
    },
    {
      type: "number",
      name: "gasPriceOracleBaseFeeScalar",
      message: "Enter the Base Fee Scalar (gasPriceOracleBaseFeeScalar):",
      validate: (input) => (input ? true : "Base Fee Scalar cannot be empty."),
    },
    {
      type: "number",
      name: "gasPriceOracleBlobBaseFeeScalar",
      message: "Enter the Blob Base Fee Scalar (gasPriceOracleBlobBaseFeeScalar):",
      validate: (input) => (input ? true : "Blob Base Fee Scalar cannot be empty."),
    },
  ]);
  postData.L2_GENESIS_BLOCK_GAS_LIMIT = gasConfig.l2GenesisBlockGasLimit;
  postData.EIP1559_ELASTICITY = gasConfig.eip1559Elasticity;
  postData.EIP1559_DENOMINATOR = gasConfig.eip1559Denominator;
  postData.GAS_PRICE_ORACLE_BASE_FEE_SCALAR = gasConfig.gasPriceOracleBaseFeeScalar;
  postData.GAS_PRICE_ORACLE_BLOB_BASE_FEE_SCALAR = gasConfig.gasPriceOracleBlobBaseFeeScalar;

  // Confirm configuration
  console.log(colors.fg.blue, "\n====================================", colors.reset);
  const { isCorrect } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isCorrect",
      message: "Is all the above information correct?",
      default: true,
    },
  ]);
  if (!isCorrect) {
    console.log(colors.fg.red, "Please run the command again", colors.reset);
    throw new Error("User did not confirm the data");
  }

  // Trim string values
  for (const key in postData) {
    if (typeof postData[key] === "string") {
      postData[key] = postData[key].trim();
    }
  }

  return postData;
}