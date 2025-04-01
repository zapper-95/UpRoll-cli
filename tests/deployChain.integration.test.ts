import * as configModule from "../src/commands/deploy-cmd-cli/get-rollup-config";
import * as projectModule from "../src/configs/project";
import { deployDevnet, deployTestnet } from "../src/commands/deploy-cmd-cli/rollup-deploy-cmd-cli";
import { createProjectDirectory } from "../src/utils/project-manage";
import { getSelectedDevnetConfig, getSelectedTestnetConfig } from "./helper/test_configs";


// give 12 minutes for each command to run
const DEPLOY_TIMEOUT_MS = 12 * 60 * 1000;


jest.setTimeout(DEPLOY_TIMEOUT_MS);

beforeEach(async () => {
  // simulate the user building a project
  await createProjectDirectory("test");
}
);

afterEach(() => {
  jest.restoreAllMocks();
});

test('[ci-only] deploy devnet', async() => {
  const selected = getSelectedDevnetConfig()
  jest.spyOn(projectModule, "getDevnetChoice").mockResolvedValue({devnetConfig: selected});
  await deployDevnet({projectName: "test", networkType: "devnet"});
  },
  DEPLOY_TIMEOUT_MS
);

test(`[ci-only] deploy testnet CLI`, async() => {
    const selected = getSelectedTestnetConfig()
    // mock GetRollupConfig to return fakeconfig
    jest.spyOn(configModule, 'GetRollupConfig').mockResolvedValue(selected);
    await deployTestnet({projectName: "test", networkType: "devnet"});
},
DEPLOY_TIMEOUT_MS
);

