<p align="center">
  <a href="https://turbo.build/repo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/4060187/196936123-f6e1db90-784d-4174-b774-92502b718836.png">
      <img src="https://upnode.org/static/746efe80b6fc0c3e8fe0326ce303ccfd/416c3/upnode.webp" height="128">
    </picture>
    <h1 align="center">Opstack CLI Tool</h1>
    <h4 align="center">By Upnode Deploy</h4>
  </a>
</p>

<p align="center">
  <a aria-label="Typescript" href="https://www.npmjs.com/package/turbo">
    <img alt="" src="https://flat.badgen.net/badge/icon/Typescript?icon=typescript&label">
  </a>
  <a aria-label="Docker" href="https://www.npmjs.com/package/turbo">
    <img alt="" src="https://flat.badgen.net/badge/icon/docker?icon=docker&label">
  </a>
</p>

# Opstack CLI Tool

<a href="https://imgbb.com/"><img src="https://i.ibb.co/jWynfrz/Imgur-Magic.gif" alt="Imgur-Magic" border="0"></a>
  
**Opstack CLI Tool** by Upnode Deploy allows chain operators and developers to quickly launch their OP Stack chain with the necessary infrastructure, including an explorer, bridge, faucet, and monitoring system, by modifying a few environment variables related to the RPC endpoint, private keys, and chain information.

With easy method by run just command and config your chain by just run `ops run`

Unlike Conduit, **Opstack CLI Tool** provides developers and chain operators with a tool to deploy OP Stack chains on their own servers instead of relying on third-party managed servers. Upnode Deploy is free, open-source, and fully transparent, whereas Conduit is a paid, closed-source solution.

**Opstack CLI Tool** supports the latest OP Stack v1.9.0 and is prepared for the upcoming migration

**Opstack CLI Tool** will continue develop and improvement out Tool


## Hardware requirements
Hardware requirements for OP Mainnet nodes can vary depending on the type of node you plan to run. Archive nodes generally require significantly more resources than full nodes. Below are suggested minimum hardware requirements for each type of node.

**16GB RAM**
**Reasonably modern CPU**
[Optimism official document requirement](https://nodejs.org/en/)

### SSD capacity requirements
Given the growing size of the blockchain state, choosing the right SSD size is important. Below are the storage needs as of April 2024:

- **Full Node**: The snapshot size for a full node is approximately 1.6TB, with the data directory's capacity increasing by about 1TB every six months.
- **Archive Node**: The snapshot size for an archive node is approximately 5TB, with the data directory's capacity increasing by about 3TB every six months.
[Optimism official document requirement](https://nodejs.org/en/)


## Support
- [Node.js](https://nodejs.org/en/) version 18 or higher and [Node package management](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) version 27 or higher
- [Docker compose](https://docs.docker.com/compose/) version 2.3.3 or higher


## Installation
If you run on server, see how to install the depencies by following the instruction

- Install NVM (node version management) [instruction](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps)
- Install Docker [instruction](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- Install Docker compose [instruction](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

**Install Opstack CLI Tool**

```console
$ npm install -g @upnode/opstack-cli
```

**Verify version**

```console
$ ops version
```

## Quick Start
To start the cli for the first time you need to run cmd
```console
$ ops run
```
and then you need to config the environtment As follows
| Value  | description |
| ------------- | ------------- |
| user_name       | User name of backend, indexer database   |
| user_password   | Password of database    |
| domain_name     | The domain name (must be hostname) (Example : localhost, example.test, test.app)  use for bridge, blockscout, rpc, indexer etc. |
| protocol   | Select protocol for domain  => http, https  |

When you complete initial config, the cli  will clone [opstack-deployment](https://github.com/upnodedev/opstack-deployment) and run the docker compose of opstack-deployment for REST API in our cli tool and frontend also the proxy [traefik](https://traefik.io/traefik/) that use to proxy the requests to correct services.

<span style="color:red">If you run on local matchine use doamin name domain name = **localhost , protocal = http and then add localhost to /etc/host</span>

## Deploy new chain with CLI
```console
$ ops run

=> Deploy Opstack Rollup include (Deployment UI, Grafana, Blockscout, Bridge UI)
```

### Parameter

This document outlines the configuration parameters for Layer 1 (L1) setup. Below is a table that provides detailed descriptions of each parameter along with an example configuration for the Holesky Testnet.


**Config your Wallet**

| Parameter  | Description  | 
| ------- | ---          | 
| **Enter the Batcher Private Key** |     Private key of batcher account     | 
| **Enter the Proposer Private Key** |     Private key of proposer account     | 
| **Enter the Sequencer Private Key** |     Private key of sequencer account     | 
| **Enter the Deployer Private Key** |     Private key of contract deployer account     | 
| **Enter the Admin Private Key** |     Private key of admin account     | 

**Config your Layer 1**

| Parameter                              | Description                          | Holesky (Testnet) Example                                                                 |
|-------------------------------------|--------------------------------------|------------------------------------------------------------------------------------------|
| **Enter the L1 RPC URL**            | Layer 1 RPC URL                      | `https://quick-serene-pine.ethereum-holesky.quiknode.pro/a5c5ac0df0f0656d58699a732b567738f0ef6542` |
| **Enter the L1 Chain ID**           | Layer 1 Chain ID                     | `17000`                                                                                  |
| **Enter the L1 Chain Name**         | Layer 1 Chain Name                   | `Ethereum mainnet`                                                                       |
| **Enter the L1 Logo URL**           | Layer 1 Logo URL                     | `https://cryptologos.cc/logos/ethereum-eth-logo.png`                                     |
| **Enter the L1 Native Currency Name** | Layer 1 Native Currency Name       | `Ethereum`                                                                               |
| **Enter the L1 Native Currency Symbol** | Layer 1 Native Currency Symbol   | `ETH`                                                                                    |
| **Enter the L1 Native Currency Decimals** | Layer 1 Native Currency Decimals | `18`                                                                                     |
| **Enter the L1 Block Explorer URL** | Layer 1 Block Explorer URL           | `https://holesky.beaconcha.in`                                                           |
| **Enter the L1 Block Explorer API** | Layer 1 Block Explorer API           | `-`                                                           |
| **Select RPC Kind for L1**          | RPC Kind for Layer 1                 | `quicknode`                                                                              |
| **Enter the L1 Multi Call3 Address** | Layer 1 Multi Call3 Address         | `0xcA11bde05977b3631167028862bE2a173976CA11`                                             |
| **Enter the L1 Multi Call3 Block Created** | Multi Call3 Block Created       | `77`                          

**Config your Rollup**
| Config                                    | Description                                                                                      | Example Value                                                                                     |
|-------------------------------------------|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **Enter the Rollup Name (Chain name):**   | Name of the Layer 2 Rollup chain                                                                | `Optimism`                                                                                       |
| **Enter the Rollup Chain ID:**            | Unique Chain ID for the Rollup                                                                  | `43333`                                                                                          |
| **Enter the Rollup Logo URL:**            | URL of the Rollup's logo                                                                        | `https://cryptologos.cc/logos/optimism-ethereum-op-logo.png`                                      |
| **Enter the Rollup Native Currency Name:**| Name of the native currency used in the Rollup                                                  | `Optimism Ethereum`                                                                              |
| **Enter the Rollup Native Currency Symbol:** | Symbol of the Rollup's native currency                                                         | `ETH`                                                                                            |
| **Enter the Rollup Native Currency Decimals:** | Number of decimals used in the native currency                                                | `18`                                                                                            |
| **Enter the Governance Token Name:**      | Name of the governance token used for managing the Rollup                                       | `Optimism`                                                                                       |
| **Enter the Governance Token Symbol:**    | Symbol of the governance token                                                                 | `OP`                                                                                            |
| **Number of seconds between each L2 block:** | Time (in seconds) between generating two consecutive L2 blocks. Must be less than L1 block time | `2`                                                                                              |
| **Number of blocks between proposals to the L2OutputOracle:** | Interval of blocks between proposals to the L2 Output Oracle                                     | `90`                                                                                            |
| **Number of seconds that a proposal must be available to challenge:** | Time (in seconds) before a proposal is finalized in the OptimismPortal                          | `300`    

**Config your bridge user interface**
| Config                              | Description                                      | Example Value                             |
|-------------------------------------|--------------------------------------------------|-------------------------------------------|
| **Enter the App Logo URL**          | URL for the app's logo                          | `https://i.ibb.co/r36YpbK/upnode.png`     |
| **Enter the Primary Color**         | Primary color for the app's theme               | `#27005D`                                 |
| **Enter the Secondary Color**       | Secondary color for the app's theme             | `#9EDDFF`                                 |
| **Enter the WalletConnect Project ID** | Project ID for WalletConnect integration        | `00000`                                   |


## Stop all services

<span style="color:red">** This command will stop all services **</span>
<span style="color:blue">We will develop selecting stop each service in future</span>

```console
$ ops run

=> Stop the deployment
```

## Start all services

<span style="color:red">** This command will start all services **</span>
<span style="color:blue">We will develop selecting start each service in future</span>

```console
$ ops run

=> Start the deployment
```

## Status of the deployment

This command will display the status of the deployment for all services and check status of docker container for every services.

```console
$ ops run

=> Status of the deployment
```

## View logs

Display logs and status each service

<a href="https://ibb.co/svsrvvt"><img src="https://i.ibb.co/zhPwhhN/Screenshot-2567-12-14-at-21-27-51.png" alt="Screenshot-2567-12-14-at-21-27-51" border="0"></a>

```console
$ ops run

=> Views logs
```

## Chain Info

```console
$ ops run

=> Chain Info
```

<a href="https://ibb.co/gw23fh1"><img src="https://i.ibb.co/q9SdcVG/Screenshot-2567-12-14-at-21-33-03.png" alt="Screenshot-2567-12-14-at-21-33-03" border="0"></a>

- **Data Volume path** = rollup data
- **deploy-config** = path of deploy-config.json (rollup config)
- **genesis.json** = path of genesis.json (genesis config data)
- **Data Volume path** = rollup data