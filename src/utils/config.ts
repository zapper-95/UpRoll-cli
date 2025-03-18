import path from "path";

export const CONFIG = {
  DEPLOYMENT_REPO: 'https://github.com/zapper-95/optimism-package.git',
  DEPLOYMENT_REPO_VERSION: '1.2.0',
  DEPLOYMENT_REPO_HASH : 'ccd0b8fff9b8c5b63943ccd00d7f1c7d6a287aee',
};

export const WEBSITE = {
  ENDPOINT: "https://uproll-web.vercel.app/api/configs/[id]/yaml/"
}


export const PATH_NAME = {
  DEPLOYMENT_REPO: path.join(path.join(__dirname, '../..'), 'optimism-package'),
  UPROLL_CLI : path.join(__dirname, '../..'),
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