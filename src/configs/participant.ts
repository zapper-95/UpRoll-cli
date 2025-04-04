import inquirer from "inquirer";
import { colors } from "../utils/colors";
import { CL_IMAGES, EL_IMAGES } from "../utils/config";


export async function getParticipantsConfig(postData: { [key: string]: any }) {
    console.log(colors.fg.yellow, "Configure Participants", colors.reset);
    const participants: any[] = [];
    // Add default participant: op-geth with op-node
    let adding = true;
    while (adding) {
      const participant = await inquirer.prompt([
        {
          type: "input",
          name: "el_type",
          message: "Enter the execution layer (default: op-geth):",
          validate: (input) => (input in EL_IMAGES ? true : "Invalid execution layer. It should be one of the following " + Object.keys(EL_IMAGES).join(", ")),
          default: "op-geth",
        },
        {
          type: "input",
          name: "cl_type",
          message: "Enter the consensus layer (default: op-node):",
          validate: (input) => (input in CL_IMAGES ? true : "Invalid consensus layer. It should be one of the following " + Object.keys(CL_IMAGES).join(", ")),
          default: "op-node",
        },
      ]);
      const participantsImage = await inquirer.prompt([
        {
          type: "input",
          name: "el_image",
          message: "Enter the execution layer image:",
          default: EL_IMAGES[participant.el_type],
        },
        {
          type: "input",
          name: "cl_image",
          message: "Enter the consensus layer image:",
          default: CL_IMAGES[participant.cl_type],
        },
        
      ]);
      participants.push({...participant, ...participantsImage});

      const { addParticipant } = await inquirer.prompt([
        {
          type: "confirm",
          name: "addParticipant",
          message: "Would you like to add another participant?",
          default: false,
        },
      ]);
      adding = addParticipant;
      }
    postData.participants = participants;
  
}
    


