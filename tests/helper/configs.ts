import { standardConfig, signerConfig } from "../fixtures";

const configs = {
  "standard": standardConfig,
  "signer-proxy": signerConfig,
};

export function getSelectedConfig() {
  const type = process.env.CONFIG_TYPE ?? "standard";
  return configs[type as keyof typeof configs] ?? standardConfig;
}