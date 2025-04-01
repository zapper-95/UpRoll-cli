import { standardConfig, signerConfig, altdaConfig} from "../fixtures";

const testnetConfigs = {
  "standard": standardConfig,
  "signer-proxy": signerConfig,
  "altda": altdaConfig,
};

const devnetConfigs = ["simple", "interop"]

export function getSelectedTestnetConfig() {
  const type = process.env.CONFIG_TYPE ?? "standard";
  return testnetConfigs[type as keyof typeof testnetConfigs] ?? standardConfig;
}

export function getSelectedDevnetConfig(){
  const type = process.env.CONFIG_TYPE ?? "simple";
  return devnetConfigs.includes(type) ? type : "simple";
}

