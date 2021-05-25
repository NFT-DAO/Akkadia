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
import trx from './transaction.js';

/**
 * Mint a series of tokens.
 * @param {string} sender The DAO wallet address
 * @param {string} skey The DAO payment key
 * @param {file} policyScript The policy script used to mint
 * @param {string} policyskey The policy minting key
 * @param {file} metadata The metadata file
 * @param {int} low The starting token number
 * @param {int} high The ending token number
 * @param {string} policyId The polic ID
 * @param {string} assetBase The asset base, i.e. DAONFT in DAONFT0001
 * @param {int} precision The number of zeros
 */
const mint = (sender, skey, policyScript, policyskey, metadata, low, high, policyId, assetBase, precision=5) => {
  // Get Protocols
  trx.params().then((params) => {
    trx.write('protocol.json', params)
  });
  // Get Sender UTXO
  trx.utxo(sender).then((utxo) => {
    trx.write('utxo.json', utxo)
  });
  // Get balance, tx-in-count, and tx-in
  const [txin, tokens, counter] = trx.processUtxo();
  const mintString = trx.mintingString(low, high, policyId, assetBase, precision)
  let txout = trx.customTxOut(sender, tokens, {})
  txout = txout.slice(0, -1) + ' + ' + mintString.slice(1)
  // Get chain tip
  trx.tip().then((value) => {
    const final = JSON.parse(value).slot + 250000;
    // Build draft transaction
    trx.buildRawMint(txin, txout , mintString, 0, final, metadata, 'tx.draft')
    // Estimate the fee
    trx.fee(counter, 1).then(value => {
      const fee = value.split(' ')[0];
      tokens.lovelace -= fee;
      // Get new txout here
      txout = trx.customTxOut(sender, tokens, {});
      txout = txout.slice(0, -1) + ' + ' + mintString.slice(1)
      // Build raw transaction
      trx.buildRaw(txin, txout , fee, final, metadata, 'tx.raw')
      // Sign the transaction
      trx.signMint(skey, policyskey, policyScript)
      // Submit the transactions
      trx.submit();
    })
  })

};

// Export
export default {
  mint
};