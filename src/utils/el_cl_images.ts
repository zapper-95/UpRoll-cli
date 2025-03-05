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