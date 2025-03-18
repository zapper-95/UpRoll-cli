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
            type: "number",
            name: "chain_id",
            message: "Enter the dependency Chain ID:",
            validate: (input) => {
              if (!input) return "Chain ID cannot be empty.";
              return dependencies.hasOwnProperty(input) ? "Chain ID already exists." : true;
            },
          },
          {
            type: "input",
            name: "activation_time",
            message: "Enter the Activation Time:",
            validate: (input) => (input ? true : "Activation Time cannot be empty."),
          },
          {
            type: "input",
            name: "history_min_time",
            message: "Enter the History Min Time:",
            validate: (input) => (input ? true : "History Min Time cannot be empty."),
          },
        ]);
        
        dependencies[dependency.chain_id] = dependency;
        
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