import inquirer from "inquirer";
import { colors } from "../utils/colors";


export async function getInteropConfig(postData: { [key: string]: any }) {
    
    const interop: {[key:string]:any} = {};
  
    console.log(colors.fg.yellow, "Interop Configuration", colors.reset);


    const { enabled } = await inquirer.prompt([
      {
        type: "confirm",
        name: "enabled",
        message: "Enable interop with other rollups?",
        default: false,
      },
    ]);
    
    interop["enabled"] = enabled;
    
    if (interop["enabled"]) {
      const dependencies: {[key: string]: any} = {};
      let addingDependency = true;
      
      while (addingDependency) {
        const dependency = await inquirer.prompt([
          {
            type: "input",
            name: "chainId",
            message: "Enter the dependency Chain ID:",
            validate: (input) => {
              if (!input) return "Chain ID cannot be empty.";
              return Object.prototype.hasOwnProperty.call(dependencies, input) ? "Chain ID already exists." : true;
            },
          },
          {
            type: "number",
            name: "activationTime",
            message: "Enter the Activation Time:",
            validate: (input) => (input ? true : "Activation Time cannot be empty."),
          },
          {
            type: "number",
            name: "historyMinTime",
            message: "Enter the History Min Time:",
            validate: (input) => (input ? true : "History Min Time cannot be empty."),
          },
        ]);
        
        dependencies[dependency.chainId] = dependency;
        
        const { addAnother } = await inquirer.prompt([
          {
            type: "confirm",
            name: "addAnother",
            message: "Add another dependency?",
            default: false,
          },
        ]);
        
        if (!addAnother) {
          addingDependency = false;
        }
      }

      // create dependencies object
      interop["supervisor_params"] = {"dependency_set" : JSON.stringify(dependencies)};
      postData.interop = interop;
    }
}