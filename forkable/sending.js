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
 * Send out a batch transactions.
 * @param {string} sender The sending wallet address.
 * @param {file} skey The sending wallet skey file.
 * @param {object} addresses An object of addresses and tokens to send.
 */
const send = (sender, skey, addresses) => {
  // Get Protocols
  trx.write('metadata.json', '{}')
  trx.params().then((params) => {
    trx.write('protocol.json', params)
  });
  // Get Sender UTXO
  trx.utxo(sender).then((utxo) => {
    trx.write('utxo.json', utxo)
  });
  // Get balance, tx-in-count, and tx-in
  const [txin, tokens, counter] = trx.processUtxo();
  let txout = trx.customTxOut(sender, tokens, addresses) // Build custom out
  console.log(txin, tokens, counter)
  console.log(txout)
  // Get chain tip
  trx.tip().then((value) => {
    const final = JSON.parse(value).slot + 250000;
    // Build draft transaction
    trx.buildRaw(txin, txout , 0, final, 'metadata.json', 'tx.draft')
    // Estimate the fee
    if (Object.keys(addresses).length === 0) {return false}
    trx.fee(counter, 1+Object.keys(addresses).length).then(value => {
      const fee = value.split(' ')[0];
      tokens.lovelace -= fee;
      // Get new txout here
      txout = trx.customTxOut(sender, tokens, addresses);
      console.log(txout)
      // Build raw transaction
      trx.buildRaw(txin, txout , fee, final, 'metadata.json', 'tx.raw')
      // Sign the transaction
      trx.sign(skey)
      // Submit the transactions
      trx.submit();
      return true
    }) // End of fee
  }) // End of tip
};

// Export
export default {
  send
};