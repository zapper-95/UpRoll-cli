import { colors } from "../../utils/colors";
import inquirer from "inquirer";


export async function getL1Config(postData: { [key: string]: any }) {
  let l1_config: {[key:string]:any} = {};
  
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

  if (settlementLayer === "Custom") {
    const customSettlement = await inquirer.prompt([
      {
        type: "input",
        name: "customChainId",
        message: "Enter the Custom Chain ID:",
        validate: (input) => (input ? true : "Chain ID cannot be empty."),
        default: "3151908",
      },
    ]);
    l1_config["network_id"] = customSettlement.customChainId;
  }
  else{
    l1_config["network_id"] = settlementLayer === "ETH Mainnet" ? "1": "11155111";
  }

  const {el_rpc_url} = await inquirer.prompt([
    {
      type: "input",
      name: "el_rpc_url",
      message: "Enter the EL RPC URL:",
      validate: (input) => (input ? true : "EL RPC URL cannot be empty."),
      default: "http://el-1-geth-teku:8545"
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
  l1_config["el_rpc_url"] = el_rpc_url;

  if (useSameUrl) {
    l1_config["el_ws_url"] = el_rpc_url.includes("http") ? el_rpc_url.replace("http", "ws") : el_rpc_url.replace("https", "wss");
    l1_config["cl_rpc_url"] = el_rpc_url;
  }
  else {
    const {el_ws_url} = await inquirer.prompt([
      {
        type: "input",
        name: "el_ws_url",
        message: "Enter the EL WS URL:",
        validate: (input) => (input ? true : "EL WS URL cannot be empty."),
        default: "ws://el-1-geth-teku:8546"
      },
    ]);
    const {cl_rpc_url} = await inquirer.prompt([
      {
        type: "input",
        name: "cl_rpc_url",
        message: "Enter the CL RPC URL:",
        validate: (input) => (input ? true : "CL RPC URL cannot be empty."),
        default: "http://cl-1-teku-geth:4000"
      },
    ]);
    l1_config["el_ws_url"] = el_ws_url;
    l1_config["cl_rpc_url"] = cl_rpc_url;
  }

  // rpc kind is alchemy if contains .alchemy or .quicknode if contains .quicknode
  if (el_rpc_url.includes(".alchemy")) {
    l1_config["rpc_kind"] = "alchemy";
  } else if (el_rpc_url.includes(".quicknode")) {
    l1_config["rpc_kind"] = "quicknode";
  } else {
    l1_config["rpc_kind"] = "standard";
  }

  // Deployer Private Key
  const { deployer_priv_key } = await inquirer.prompt([
    {
      type: "input",
      name: "deployer_priv_key",
      message: "Enter the Deployer Private Key:",
      validate: (input) => (input ? true : "Deployer Private Key cannot be empty."),
      default: "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31"
    },
  ]);

  l1_config["priv_key"] = deployer_priv_key;
  postData.external_l1_network_params = l1_config;
}
