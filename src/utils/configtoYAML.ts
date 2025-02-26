export function configToYAML(projectName: string, postData: { [key: string]: any }) {
  const path = require("path");
  const fs = require("fs");
  const yaml = require("js-yaml");

  // Load the YAML template
  const templatePath = path.join(__dirname, "../templates/testnet_config.yaml");
  const config = yaml.load(fs.readFileSync(templatePath, "utf8"));

  // --- External L1 Args (Settlement Layer) ---
  // Determine the correct chain ID for the settlement layer.
  let settlementChainId = "";
  if (postData.SETTLEMENT_LAYER === "Custom") {
    settlementChainId = postData.CUSTOM_CHAIN_ID;
  } else if (postData.SETTLEMENT_LAYER === "ETH Mainnet") {
    settlementChainId = "1";
  } else if (postData.SETTLEMENT_LAYER === "ETH Sepolia") {
    settlementChainId = "11155111"; // Adjust if needed
  }

  config.external_l1_network_params = {
    rpc_kind: postData.L1_RPC_KIND,
    el_rpc_url: postData.L1_EL_RPC_URL,
    el_ws_url: postData.L1_WS_URL,
    cl_rpc_url: postData.L1_CL_RPC_URL,
    network_id: settlementChainId,
  };

  // --- Chain (Rollup) Configuration ---
  config.optimism_package.chains[0].network_params.name = postData.ROLLUP_NAME;
  config.optimism_package.chains[0].network_params.network_id = String(postData.L2_CHAIN_ID);
  config.optimism_package.chains[0].network_params.seconds_per_slot = postData.L2_BLOCK_TIME;
  config.optimism_package.chains[0].proofMaturityDelaySeconds = postData.proofMaturityDelaySeconds;
  config.optimism_package.chains[0].base_fee_vault_recipient = postData.sequencerFeeRecipient;
  config.optimism_package.chains[0].l1_fee_vault_recipient = postData.sequencerFeeRecipient;
  config.optimism_package.chains[0].sequencer_fee_vault_recipient = postData.sequencerFeeRecipient;
  config.optimism_package.chains[0].base_fee_vault_withdrawal_network = postData.feeWithdrawalNetwork;
  config.optimism_package.chains[0].l1_fee_vault_withdrawal_network = postData.feeWithdrawalNetwork;
  config.optimism_package.chains[0].sequencer_fee_vault_withdrawal_network = postData.feeWithdrawalNetwork;

  // --- Participants ---
  if (postData.PARTICIPANTS && Array.isArray(postData.PARTICIPANTS)) {
    config.optimism_package.chains[0].participants = postData.PARTICIPANTS.map((p: any) => ({
      el_type: p.executionClient || "op-geth",
      cl_type: p.consensusClient || "op-node",
    }));
  }

  // --- Signer Configuration ---
  config.optimism_package.deployer_private_key = postData.DEPLOYER_PRIVATE_KEY;

  function setSignerParams(
    paramsBlock: any,
    role: string,
    kind: string,
    privateKey: string,
    signerEndpoint: string
  ) {
    if (kind === "Private Key") {
      paramsBlock.extra_params.push(`--${role.toLowerCase()}.private-key=${privateKey}`);
    } else {
      paramsBlock.extra_params.push(`--${role.toLowerCase()}.signer-endpoint=${signerEndpoint}`);
    }
  }

  // Configure Batcher, Sequencer, and Proposer using their respective params blocks.
  setSignerParams(
    config.optimism_package.chains[0].batcher_params,
    "Batcher",
    postData.BATCHER_KIND,
    postData.BATCHER_PRIVATE_KEY,
    postData.BATCHER_SIGNER_ENDPOINT
  );

  setSignerParams(
    config.optimism_package.chains[0].challenger_params,
    "Sequencer",
    postData.SEQUENCER_KIND,
    postData.SEQUENCER_PRIVATE_KEY,
    postData.SEQUENCER_SIGNER_ENDPOINT
  );

  setSignerParams(
    config.optimism_package.chains[0].proposer_params,
    "Proposer",
    postData.PROPOSER_KIND,
    postData.PROPOSER_PRIVATE_KEY,
    postData.PROPOSER_SIGNER_ENDPOINT
  );

  // --- Admin Configuration ---
  config.optimism_package.final_system_owner = postData.L1_SYSTEM_ADMIN;
  config.optimism_package.proxy_admin_owner = postData.L2_PROXY_ADMIN;

  // --- Gas Configuration ---
  config.optimism_package.chains[0].l2_genesis_block_gas_limit = postData.l2GenesisBlockGasLimit;
  config.optimism_package.chains[0].eip1559_elasticity = postData.eip1559Elasticity;
  config.optimism_package.chains[0].eip1559_denominator = postData.eip1559Denominator;
  config.optimism_package.chains[0].gas_price_oracle_base_fee_scalar = postData.gasPriceOracleBaseFeeScalar;
  config.optimism_package.chains[0].gas_price_oracle_blob_base_fee_scalar = postData.gasPriceOracleBlobBaseFeeScalar;

  // --- Final Touches ---
  const newYaml = yaml.dump(config);
  const newConfigPath = path.join(__dirname, `../projects/${projectName}/config.yaml`);
  fs.writeFileSync(newConfigPath, newYaml, "utf8");
  console.log("Config file created successfully. Your rollup is now configured to use the correct settlement chain ID!");
}