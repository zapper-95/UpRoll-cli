import { standardConfig, signerConfig, altdaConfig} from "../fixtures";

const configs = {
  "standard": standardConfig,
  "signer-proxy": signerConfig,
  "altda": altdaConfig,
};

export function getSelectedConfig() {
  const type = process.env.CONFIG_TYPE ?? "standard";
  return configs[type as keyof typeof configs] ?? standardConfig;
}