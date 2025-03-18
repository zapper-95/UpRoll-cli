import inquirer from "inquirer";
import { colors } from "../utils/colors";


export async function confirmConfig(postData: { [key: string]: any }) {
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
  console.log(postData);
}