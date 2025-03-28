import * as configModule from "../src/commands/deploy-cmd-cli/get-rollup-config";
import { deployDevnet, deployTestnet } from "../src/commands/deploy-cmd-cli/rollup-deploy-cmd-cli";
import { createProjectDirectory } from "../src/utils/project-manage";
import { getSelectedConfig } from "./helper/configs";


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
  await deployDevnet({projectName: "test", networkType: "devnet"});
  },
  DEPLOY_TIMEOUT_MS
);


test(`[ci-only] deploy testnet CLI`, async() => {
    const selected = getSelectedConfig()
    // mock GetRollupConfig to return fakeconfig
    jest.spyOn(configModule, 'GetRollupConfig').mockResolvedValue(selected);
    await deployTestnet({projectName: "test", networkType: "devnet"});
},
DEPLOY_TIMEOUT_MS
);

