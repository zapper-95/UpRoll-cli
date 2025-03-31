import path from "path";
import os from "os";

export const CONFIG = {
  DEPLOYMENT_REPO: 'https://github.com/zapper-95/optimism-package.git',
  DEPLOYMENT_REPO_VERSION: '1.2.0',
  DEPLOYMENT_REPO_HASH : '8a13dac56ce6f4e0a873838601a178b14cdc6b4a',
};

export const WEBSITE = {
  ENDPOINT: "https://uproll-web.vercel.app/api/configs/[id]/yaml/"
}

const UPROLL_GLOBAL_DIR = path.join(os.homedir(), "UpRoll");

import fs from "fs";
fs.mkdirSync(UPROLL_GLOBAL_DIR, { recursive: true });
fs.mkdirSync(path.join(UPROLL_GLOBAL_DIR, "projects"), { recursive: true });

export const PATH_NAME = {
  DEPLOYMENT_REPO: path.join(UPROLL_GLOBAL_DIR, "optimism-package"),
  UPROLL_CLI: UPROLL_GLOBAL_DIR,
  PROJECTS: path.join(UPROLL_GLOBAL_DIR, "projects"),
};



export const EL_IMAGES: {[key:string]:string} = {
  "op-geth": "us-docker.pkg.dev/oplabs-tools-artifacts/images/op-geth:latest",
  "op-reth": "ghcr.io/paradigmxyz/op-reth:latest",
  "op-erigon": "testinprod/op-erigon:latest",
  "op-nethermind": "nethermind/nethermind:latest",
  "op-besu": "ghcr.io/optimism-java/op-besu:latest",
}

export const CL_IMAGES: {[key:string]:string} = {
  "op-node": "us-docker.pkg.dev/oplabs-tools-artifacts/images/op-node:develop",
  "hildr": "ghcr.io/optimism-java/hildr:latest",
}