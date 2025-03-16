import { colors } from "../../utils/colors";
import inquirer from "inquirer";


export async function getSignerConfig(postData: { [key: string]: any }) {

// Signer Configuration
  console.log(colors.fg.yellow, "Signer Configuration", colors.reset);


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
      const { private_key } = await inquirer.prompt([
        {
          type: "input",
          name: "private_key",
          message: `Enter the ${role} Private Key:`,
          validate: (input) => (input ? true : `${role} Private Key cannot be empty.`),
        },
      ]);
      config["private_key"] = private_key;
    } else {
      const signerConfig = await inquirer.prompt([
        {
          type: "input",
          name: "signer_address",
          message: `Enter the ${role} Signer Address:`,
          validate: (input) => (input ? true : `${role} Signer Address cannot be empty.`),
        },
        {
          type: "input",
          name: "signer_endpoint",
          message: `Enter the ${role} Signer Endpoint:`,
          validate: (input) => (input ? true : `${role} Signer Endpoint cannot be empty.`),
        },

      ]);
      config["signer_address"] = String(signerConfig.signer_address);
      config["signer_endpoint"] = String(signerConfig.signer_endpoint);
    }
    return config;
  }

  let signer_params: { [key: string]: any } = {};
  const batcherConfig = await getSignerConfig("batcher");
  signer_params["batcher_params"] = batcherConfig;

  const sequencerConfig = await getSignerConfig("sequencer");
  signer_params["sequencer_params"] = sequencerConfig;

  const proposerConfig = await getSignerConfig("proposer");
  signer_params["proposer_params"] = proposerConfig;

  const challengerConfig = await getSignerConfig("challenger");
  signer_params["challenger_params"] = challengerConfig;

  postData.signer_params = signer_params;
  console.log(signer_params);
}