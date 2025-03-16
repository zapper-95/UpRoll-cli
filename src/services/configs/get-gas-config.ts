import { colors } from "../../utils/colors";
import inquirer from "inquirer";


export async function getGasConfig(postData: { [key: string]: any }) {
  // Gas Configuration
  console.log(colors.fg.yellow, "Gas Configuration", colors.reset);
  const gasConfig = await inquirer.prompt([
    {
      type: "input",
      name: "gas_limit",
      message: "Enter the Block Gas Limit (l2GenesisBlockGasLimit):",
      validate: (input) => (input ? true : "Block Gas Limit cannot be empty."),
      default: "0x17D7840"
    },
    {
      type: "number",
      name: "eip_1559_elasticity",
      message: "Enter the EIP 1559 Elasticity:",
      validate: (input) => (input ? true : "EIP 1559 Elasticity cannot be empty."),
      default: 6
    },
    {
      type: "number",
      name: "eip_1559_denominator",
      message:
        "Enter the EIP 1559 Denominator (applies to both eip1559Denominator and eip1559DenominatorCanyon):",
      validate: (input) => (input ? true : "EIP 1559 Denominator cannot be empty."),
      default: 50
    },
    {
      name: "base_fee_scalar",
      type: "number",
      message: "Enter the Base Fee Scalar (gasPriceOracleBaseFeeScalar):",
      validate: (input) => (input ? true : "Base Fee Scalar cannot be empty."),
      default: 2
    },
    {
      type: "number",
      name: "blob_base_fee_scalar",
      message: "Enter the Blob Base Fee Scalar (gasPriceOracleBlobBaseFeeScalar):",
      validate: (input) => (input ? true : "Blob Base Fee Scalar cannot be empty."),
      default: 1
    },
  ]);

  postData.gas_config = gasConfig;
}