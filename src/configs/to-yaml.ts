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
  // only allow one chain for now
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
  config.optimism_package.altda_deploy_config = postData.altda_deploy_config;

  // --- Additional Services ---
  // this may include an altda test
  chain.additional_services = postData.additional_services;

  // --- Finalize and Save YAML ---
  const newYaml = yaml.dump(config);
  console.log(colors.fg.magenta, "Produced YAML:");
  console.log(newYaml, colors.reset);
  const newConfigPath = getProjectConfig(postData.rollup_name);
  await fs.promises.writeFile(newConfigPath, newYaml);
}


export async function rollupNameToYAML(rollupName: string) {

  const config = {"optimism_package": {"chains":[{"network_params": {"name": rollupName}}]}};
  const newYaml = yaml.dump(config);
  
  console.log(colors.fg.magenta, "Produced YAML:");
  console.log(newYaml, colors.reset);
  const newConfigPath = getProjectConfig(rollupName);
  await fs.promises.writeFile(newConfigPath, newYaml);
}
