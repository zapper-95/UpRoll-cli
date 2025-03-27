import { deployDevnet } from "../src/commands/deploy-cmd-cli/rollup-deploy-cmd-cli";
import { createProjectDirectory, removeUprollDirectory} from "../src/utils/project-manage";
import {cloneOptimismPacakge} from "../src/utils/clone"; 
import {removeEnclave} from "../src/utils/kurtosis";

// give 12 minutes for each command to run
const DEPLOY_TIMEOUT_MS = 12 * 60 * 1000;
jest.setTimeout(DEPLOY_TIMEOUT_MS);

beforeEach(async () => {
  // clone the optimism package, create the project directory test, so deployDevnet writes the YAML config to it
  //await removeUprollDirectory();
  //await removeEnclave("test");

  //await cloneOptimismPacakge();
  await createProjectDirectory("test");
}
);


afterEach(async()=>{
  await removeUprollDirectory();
  await removeEnclave("test");
})


test('deploy devnet', async() => {

    const controller = new AbortController()
    const failSafe = setTimeout(() => {
      console.warn('Timeout hit — aborting deploy...');
      controller.abort();
    }, DEPLOY_TIMEOUT_MS);

    try{
      await deployDevnet({projectName: "test", networkType: "devnet"}, controller.signal);
    }
    finally{
      clearTimeout(failSafe);
    }
  },
  DEPLOY_TIMEOUT_MS
);

