import { 
  getL1Config, 
  getParticipantsConfig, 
  getSignerConfig, 
  getChainConfig,
  getGasConfig,
  getDaConfig,
  getInteropConfig,
  confirmConfig
} from "../../configs";

export async function GetRollupConfig(rollupName:string): Promise<{ [key: string]: any }> {
  const postData: { [key: string]: any } = {};

  postData.rollup_name = rollupName;

  // Level 1
  await getL1Config(postData);

  // Participants
  await getParticipantsConfig(postData);

  // Signer Configuration
  await getSignerConfig(postData);

  // Chain Configuration
  await getChainConfig(postData);

  // Gas Configuration
  await getGasConfig(postData);

  // Data Availability
  await getDaConfig(postData);

  // Interop Configuration
  await getInteropConfig(postData);

  await confirmConfig(postData);
  return postData;
}