/**
 * Copyright [2021] [Quinn Parkinson]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 *
 */
import blockfrost from './get.js';

// const key = "QFwD2lHa2iYRXBUxOg6FsXs3AV8OS1KY"; // Mainnet Key
// const chain = "cardano-mainnet"; // Mainnet Chain
const key = "gBK7ZLMYhMxrjW8eRUQRu2c7SRAmkkML"; // Testnet Key
const chain = "cardano-testnet"; // Testnet Chain

/**
 * Get information about some public address. This contains the stake address.
 * @param {string} publicAddress A public Address
 * @return {Promise}
 */
const getAddressInfo = (publicAddress) => {
  const url = `https://${chain}.blockfrost.io/api/v0/addresses/${publicAddress}`;
  return blockfrost.get(url, key);
};

/**
 * Get the data from some asset.
 * @param {string} asset Concatenation of the policy_id and hex-encoded asset_name
 * @returns {Promise}
 */
const getAssetData = (asset) => {
  const url = `https://${chain}.blockfrost.io/api/v0/assets/${asset}`;
  return blockfrost.get(url, key);
};


/**
 * Get all the transactions associated with an asset.
 * @param {string} asset Concatenation of the policy_id and hex-encoded asset_name
 * @returns {Promise}
 */
const getAssetTrx = (asset) => {
  const url = `https://${chain}.blockfrost.io/api/v0/assets/${asset}/txs`;
  return blockfrost.get(url, key);
};

/**
 * Get the metadata from a transaction.
 * @param {string} trxHash A transaction hash.
 * @returns {Promise}
 */
const getMetadata = (trxHash) => {
  const url = `https://${chain}.blockfrost.io/api/v0/txs/${trxHash}/metadata`;
  return blockfrost.get(url, key);
};

/**
 * Gets transaction history from a public address.
 * @param {string} publicAddress A public address
 * @param {string} queryParams Additional query parameters defined in Blockfrost's docs.
 * @returns {Promise}
 */
const getAddressHistory = (publicAddress, queryParams='') => {
  const url = `https://${chain}.blockfrost.io/api/v0/addresses/${publicAddress}/txs`+queryParams;
  return blockfrost.get(url, key);
};

/**
 * Get a transaction's inputs and outputs.
 * @param {string} trxHash A transaction hash.
 * @returns {Promise}
 */
const getTrxIOInfo = (trxHash) => {
  const url = `https://${chain}.blockfrost.io/api/v0/txs/${trxHash}/utxos`;
  return blockfrost.get(url, key);
};

// Export
export default {
  getAddressInfo,
  getAddressHistory,
  getAssetTrx,
  getAssetData,
  getMetadata,
  getTrxIOInfo
};