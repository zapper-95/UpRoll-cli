import fs from 'fs';
import yaml from 'js-yaml';
import { getProjectConfig } from "../utils/project-manage";
import { colors } from '../utils/colors';

export async function configToYAML(postData: { [key: string]: any }) {

  const config: {[key:string]:any} = {};

  // --- External L1 Configuration ---
  config.external_l1_network_params = postData.external_l1_network_params

  config.optimism_package = {
    chains: [{}],
    altda_deploy_config: postData.altda_deploy_config,
    interop: postData.interop,
  }

  // --- Rollup Chain Configuration ---
  const chain = config.optimism_package.chains[0];
  chain.network_params = postData.network_params;


  // --- Participants ---
  chain.participants = postData.participants;


  // --- Signer Configuration ---
  chain.batcher_params = postData.signer_params.batcher_params;
  chain.sequencer_params = postData.signer_params.sequencer_params;
  chain.proposer_params = postData.signer_params.proposer_params;
  chain.challenger_params = postData.signer_params.challenger_params;

  // --- Gas Configuration ---
  chain.gas_params = postData.gas_config;

  // --- Data Availability ---
  chain.da_server_params = postData.da_server_params;
  if (postData.altda_deploy_config === true) {
    chain.additional_services = ["da_server"];
  }


  // --- Finalize and Save YAML ---
  const newYaml = yaml.dump(config);
  console.log("Produced YAML:", colors.fg.magenta);
  console.log(newYaml);
  const newConfigPath = getProjectConfig(postData.rollup_name);
  await fs.promises.writeFile(newConfigPath, newYaml);
}