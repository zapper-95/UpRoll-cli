export const signerConfig = {
  rollup_name: 'test',
  external_l1_network_params: {
    network_id: '3151908',
    el_rpc_url: 'http://el-1-geth-teku:8545',
    el_ws_url: 'ws://el-1-geth-teku:8546',
    cl_rpc_url: 'http://cl-1-teku-geth:4000',
    rpc_kind: 'standard',
    priv_key: 'bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31'
  },
  participants: [
    {
      el_type: 'op-geth',
      cl_type: 'op-node',
      el_image: 'us-docker.pkg.dev/oplabs-tools-artifacts/images/op-geth:latest',
      cl_image: 'us-docker.pkg.dev/oplabs-tools-artifacts/images/op-node:develop'
    }
  ],
  signer_params: {
    batcher_params: {
        signer_address: '0xD0e9d614E8d5C5C3e7F09Dcb31CB3A7552deC836',
        signer_endpoint: 'http://172.17.0.1:4000/key/65021b59-0433-47e7-975d-0dcbfe898f9e'

    },
    sequencer_params: {
      private_key: 'a020f1b3e33eb146acd69e66a9f714fc11644472f5d65df0c100c893b827821b'
    },
    proposer_params: {
      private_key: 'a020f1b3e33eb146acd69e66a9f714fc11644472f5d65df0c100c893b827821c'
    },
    challenger_params: {
      private_key: 'a020f1b3e33eb146acd69e66a9f714fc11644472f5d65df0c100c893b827821d'
    }
  },
  network_params: {
    network_id: '2151908',
    seconds_per_slot: 2,
    withdrawal_delay: 604800,
    dispute_game_finality_delay: 302400,
    fee_withdrawal_network: 0,
    name: 'test'
  },
  gas_config: {
    gas_limit: '0x17D7840',
    eip_1559_elasticity: 6,
    eip_1559_denominator: 50,
    base_fee_scalar: 2,
    blob_base_fee_scalar: 1
  },
  altda_deploy_config: { use_altda: false, da_type: 'auto', batch_submission_frequency: 1 },
  da_server_params: {}
};
