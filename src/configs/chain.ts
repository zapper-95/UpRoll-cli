import inquirer from "inquirer";
import { colors } from "../utils/colors";


export async function getChainConfig(postData: { [key: string]: any }) {

    console.log(colors.fg.yellow, "Chain Configuration", colors.reset);
     const chainConfig = await inquirer.prompt([
      {
        type: "number",
        name: "network_id",
        message: "Enter the L2 Chain ID:",
        validate: (input) => (input ? true : "L2 Chain ID cannot be empty."),
        default: 2151908
      },
      {
        type: "number",
        name: "seconds_per_slot",
        message: "Enter the L2 Block Time (in seconds):",
        default: 2,
        validate: (input) => (input ? true : "L2 Block Time cannot be empty."),
      },
      {
        type: "number",
        name: "withdrawal_delay",
        message: "Enter the Withdrawal Delay (proofMaturityDelaySeconds):",
        validate: (input) => (input ? true : "Withdrawal Delay cannot be empty."),
        default: 604800
      },
      {
        type: "number",
        name: "dispute_game_finality_delay",
        message: "Enter the Dispute Game Finality Delay (disputeGameFinalityDelaySeconds):",
        validate: (input) => (input ? true : "Dispute Game Finality Delay cannot be empty."),
        default: 302400
      },
      {
        type: "list",
        name: "fee_withdrawal_network",
        message: "Select the network for vault fee withdrawal (L1 or L2):",
        choices: ["L1", "L2"],
        default: "L1",
      }
    ]);
    
    chainConfig.fee_withdrawal_network = chainConfig.fee_withdrawal_network === "L1" ? 0 : 1;
    postData.network_params = chainConfig;
    postData.network_params.name = postData.rollup_name;
}