<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://upnode.org/static/746efe80b6fc0c3e8fe0326ce303ccfd/416c3/upnode.webp">
      <img src="https://upnode.org/static/746efe80b6fc0c3e8fe0326ce303ccfd/416c3/upnode.webp" height="128">
    </picture>
    <h1 align="center">UpRoll CLI Tool</h1>
    <h4 align="center">By Upnode</h4>
</p>

<p align="center">
  <a aria-label="Typescript" href="https://www.npmjs.com/package/turbo">
    <img alt="" src="https://flat.badgen.net/badge/icon/Typescript?icon=typescript&label">
  </a>
  <a aria-label="Docker" href="https://www.npmjs.com/package/turbo">
    <img alt="" src="https://flat.badgen.net/badge/icon/docker?icon=docker&label">
  </a>
</p>

# UpRoll CLI Tool

<!-- <a href="https://imgbb.com/"><img src="https://i.ibb.co/jWynfrz/Imgur-Magic.gif" alt="Imgur-Magic" border="0"></a> -->

The **UpRoll CLI Tool** by Upnode enables chain operators and developers to efficiently configure and deploy OP Stack chains. You can create a chain configuration either through our [website](https://uproll-web.vercel.app/) or directly via the CLI.

Deployment is handled through the CLI. If you're using a chain from the website run
 ```
 run uproll deploy -i [config_id]
 ```
Otherwise, deployment happens automatically after building the chain via the CLI.

For deployment, UpRoll uses a fork of the [optimism package](https://github.com/zapper-95/optimism-package) which provides greater levels of customisation. Unlike Conduit, which is a paid, closed-source solution that relies on third-party managed servers, UpRoll CLI Tool is free, open-source, and allows developers to deploy OP Stack chains on their own infrastructure with full transparency.


<!-- ## How to use -->
<!-- [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/JKe9q2z09XA/0.jpg)](https://www.youtube.com/watch?v=JKe9q2z09XA) -->

## Requirements
To run the CLI, you will first need to make sure you have the following programs:

- [Node.js](https://nodejs.org/en/download) version 18 or higher and [Node package management](https://www.npmjs.com/)
- [Docker](https://docs.docker.com/get-started/get-docker/) version 27 or higher
- [Kurtosis](https://docs.kurtosis.com/install)


**Install UpRoll CLI Tool**

```console
$ npm install -g @upnode/UpRoll-cli
```

**Verify version**

```console
$ uproll version
```

**Update version**

```console
$ npm update -g @upnode/UpRoll-cli
```

## Quick Start

To start the CLI for the first time you need to run the following command:

```console
$ uproll run
```
A folder will then be created in your home directory called `UpRoll`. This is where all files relating to your rollups will be stored.

The [optimism-package](https://github.com/zapper-95/optimism-package), which handles deployment, will also be cloned to this directory.

## Creating and Deploying a Chain

### Website + CLI

Our website allows you to create and store rollup configurations, which can then be used for deployment via the CLI.

#### 1. Create a Rollup Configuration
  1.  **Sign up** and navigate to the [Create Your Rollup](https://uproll-web.vercel.app/config) page
  2. Configure your chain settings and click **Save**
  3. Your configuration will be assigned a unique **configuration ID**

#### 2. Deploy Your Chain
To deploy your saved configuration, run:
```
uproll deploy -i [config_id]
```
Replace `config_id` with your chain's unique configuration ID.

You will then be prompted for the project name. Once provided the chain configuration will be deployed.
### Only CLI
#### 1. Create a Rollup Configuration
Run the following command:
```
$ uproll run

=> Deploy Rollup
```

You will then be prompted for values for various parameters. After confirming your selections, a valid configuration file will be generated automatically.

### 2. Deploy your Chain
Once the configuration file is created, deployment will begin automatically.


## Parameters
## Layer 1 & Rollup Configuration Parameters

### **Wallet Configuration**
| Parameter | Description |
|-----------|-------------|
| **Enter the Deployer Private Key** | Private key of the contract deployer account |

### **Layer 1 Configuration**
| Parameter | Description |
|-----------|-------------|
| **Select Settlement Layer** | Choose between ETH Mainnet, ETH Sepolia, or a Custom Layer 1 |
| **Enter the Custom Chain ID (if applicable)** | Chain ID for custom Layer 1 setup |
| **Enter the EL RPC URL** | Execution Layer RPC URL |
| **Enter the EL WS URL** | Execution Layer WebSocket URL |
| **Enter the CL RPC URL** | Consensus Layer RPC URL |
| **Select RPC Kind for L1** | Determined automatically based on the RPC URL (Alchemy, QuickNode, or Standard) |

### **Signer Configuration**
| Parameter | Description |
|-----------|-------------|
| **Enter the Batcher Private Key or Signer Endpoint** | Choose between a private key or a signer endpoint for the batcher |
| **Enter the Sequencer Private Key or Signer Endpoint** | Choose between a private key or a signer endpoint for the sequencer |
| **Enter the Proposer Private Key or Signer Endpoint** | Choose between a private key or a signer endpoint for the proposer |
| **Enter the Challenger Private Key or Signer Endpoint** | Choose between a private key or a signer endpoint for the challenger |

### **Rollup Configuration**
| Parameter | Description |
|-----------|-------------|
| **Enter the L2 Chain ID** | Unique identifier for the Layer 2 chain |
| **Enter the L2 Block Time (in seconds)** | Time interval between Layer 2 blocks |
| **Enter the Withdrawal Delay (proofMaturityDelaySeconds)** | Time before withdrawals are finalized |
| **Enter the Dispute Game Finality Delay** | Time before dispute resolution is finalized |
| **Select the network for vault fee withdrawal** | Choose between L1 and L2 for withdrawal fees |

### **Gas Configuration**
| Parameter | Description |
|-----------|-------------|
| **Enter the Block Gas Limit** | Maximum gas allowed per block |
| **Enter the EIP 1559 Elasticity** | Elasticity multiplier for EIP-1559 fee model |
| **Enter the EIP 1559 Denominator** | Denominator for EIP-1559 fee model |
| **Enter the Base Fee Scalar** | Base fee multiplier |
| **Enter the Blob Base Fee Scalar** | Blob base fee multiplier |

### **Data Availability Configuration**
| Parameter | Description |
|-----------|-------------|
| **Select a Data Availability Type** | Options: auto, blobs, calldata, or custom |
| **Enter the Batcher Submission Frequency (minutes)** | Time interval between batch submissions |
| **Enter the DA Server Endpoint (if custom)** | URL of the Data Availability server |
| **Select a Commitment Type (if custom)** | Choose between Generic and KeccakCommitment |
| **Enter the DA Challenge Contract Address (if Generic)** | Address of the challenge contract |
| **Enter the DA Challenge Window** | Time window for challenges |
| **Enter the DA Resolve Window** | Time window for resolving disputes |
| **Enter the DA Bond Size** | Size of the bond for dispute resolution |
| **Enter the DA Refund Percentage** | Percentage of refund in case of dispute resolution |

### **Interop Configuration**
| Parameter | Description |
|-----------|-------------|
| **Enable interop with other rollups?** | Boolean flag to enable interop |
| **Enter the dependency Chain ID** | Chain ID of the dependent rollup |
| **Enter the Activation Time** | Time at which the dependency activates |
| **Enter the History Min Time** | Minimum time for historical data retention |
## Stop Rollup

This command stops a specific rollup and deletes its project folder. Since Kurtosis does not support restarting an enclave after stopping it, the rollup and its associated project folder are removed.
```
ops run
=> Stop rollup
```


## Chain Info

After deployment, chain information is saved to a chains project folder. 

The **Chain info** command retrieves files relating to a rollup's deployment, such as `intent.toml` and `wallets.json` or its genesis file.
```
ops run
=> Chain Info
```
A list of active rollups is displayed. After selecting one, a list of available files appears. The chosen file is then displayed.

## Status of the deployment

This command displays the deployment status of a rollup including each service

```
ops run
=> Status of the deployment
```

## View logs

This command displays the log files of particular rollup, after it has been deployed.

```
ops run
=> Views logs
```


## Clean

Kurtosis runs multiple Docker containers for each deployed chain, which can significantly impact your computer’s performance.

If you no longer need to run any chains, use the following command to stop and remove them.

Note: This will permanently delete their project folders, including all configuration files and logs.
```
ops run
=> Clean
```
