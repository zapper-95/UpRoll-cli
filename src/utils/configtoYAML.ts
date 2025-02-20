export function configToYAML(postData: {[key: string]: any}) {
    const path = require("path");
    const fs = require('fs');
    const yaml = require('js-yaml');


    const templatePath = path.join(__dirname, '../config/testnet_config.yaml');
    const config = yaml.safeLoad(fs.readFileSync(templatePath, 'utf8'));

    // setting level 1 config
    config.external_l1_network_params = {
        network_id: postData.L1_NETWORK_ID,
        rpc_kind: postData.L1_RPC_KIND,
        el_rpc_url: postData.L1_EL_RPC_URL,
        el_ws_url: postData.L1_EL_WS_URL,
        cl_rpc_url: postData.L1_CL_RPC_URL,
        priv_key: postData.L1_PRIVATE_KEY
    };


    // setting level 2 config
    config.optimism_package.chains[0].network_params.name = postData.L2_NAME;
    config.optimism_package.chains[0].network_params.network_id = postData.L2_NETWORK_ID;
    config.optimism_package.chains[0].network_params.seconds_per_slot = postData.L2_SECONDS_PER_SLOT;


    // Setting privileged accounts information
    // Setting the batcher
    if (postData.BATCHER_KIND === "signer"){
      config.optimism_package.chains[0].batcher_params.extra_params.push("--signer.address="+ postData.BATCHER_SIGNER_ADDRESS);
      config.optimism_package.chains[0].batcher_params.extra_params.push("--signer.endpoint="+ postData.BATCHER_SIGNER_ENDPOINT);
    }
    else{
      // TODO: Add private key information for the batcher
    }

    // Setting the challenger
    if(postData.CHALLENGER_KIND === "signer"){
      config.optimism_package.chains[0].challenger_params.extra_params.push("--signer.address="+ postData.CHALLENGER_SIGNER_ADDRESS);
      config.optimism_package.chains[0].challenger_params.extra_params.push("--signer.endpoint="+ postData.CHALLENGER_SIGNER_ENDPOINT);
    }
    else{
      // TODO: Add private key information for the challenger
    }

    // Setting the proposer
    if(postData.PROPOSER_KIND === "signer"){
      config.optimism_package.chains[0].proposer_params.extra_params.push("--signer.address="+ postData.PROPOSER_SIGNER_ADDRESS);
      config.optimism_package.chains[0].proposer_params.extra_params.push("--signer.endpoint="+ postData.PROPOSER_SIGNER_ENDPOINT);
    }
    else{
      // TODO: Add private key information for the proposer
    }
    
    // Setting grafana dashboard sources
    if (postData.USE_GRAFANA){
        config.optimism_package.observability = {"grafana_params": {"dashboard_sources":[]}}
        config.optimism_package.observability.grafana_params.dashboard_sources.push(postData.GRAFANA_DASHBOARD_SOURCE);
    }
    const newYaml = yaml.safeDump(config);
    const newConfigPath = path.join(__dirname, '../config/' + postData.CONFIG_NAME + '.yaml');
    fs.writeFileSync(newConfigPath, newYaml, 'utf8');
    console.log("Config file created successfully");
}