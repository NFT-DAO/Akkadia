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
import shell from './run.js';
import fs from "fs";

// TODO Abstract into 2 environment variables:
//      One for indicating development / production environment
//      Another for pointing to testnet id.
// TODO Document this.
// const MAINNET = '--mainnet'; // MAINNET
const MAINNET = '--testnet-magic 1097911063'; // TESTNET

const read = (filePath) => {
  const command = `cat ${filePath}`
  return shell.run(command);
};

const write = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) {throw err}
  });
};

/**
 * Get Protocol Parameters and writes to the protocol.json file.
 * @return {Promise}
 */
const params = () => {
  const command = `cardano-cli query protocol-parameters \
  ${MAINNET}`;
  return shell.run(command);
};


/**
 * Get UXTO
 * @param {string} address The sender's public address.
 * @return {Promise}
 * 
 */
const utxo = (address) => {
  const command = `cardano-cli query utxo \
  --cardano-mode \
  ${MAINNET} \
  --address ${address}`;
  return shell.run(command);
};

/**
 * Get all tokens associated with an utxo.json file.
 * @param {string} txin All input trx
 * @param {object} tokens All tokens at address
 * @returns {object}
 */
const getTokens = (txin, tokens) => {
  if (txin.length === 0) {
    return tokens
  }
  if (txin[0] in tokens) {
    tokens[txin[0]] += txin[1]
  } else {
    tokens[txin[0]] = txin[1]
  }
  txin = txin.slice(2)
  if (txin[0] === '+') {
    txin = txin.slice(1)
  }
  return getTokens(txin, tokens)
};

/**
 * Get the txInCount, balance, and tx-in string.
 * @todo finish this!
 * @param {string} utxo
 * @return {int, int, string}
 */
const processUtxo = () => {
  const data = fs.readFileSync('utxo.json', 'UTF-8');
  // split the contents by new line
  const lines = data.split(/\r?\n/);
  // print all lines
  let txin = '';
  let tokens = {};
  let counter = 0;
  // Loop Each line
  lines.forEach((line) => {
    if (line[0] !== ' ' && line[0] !== '-' && line !== '') {
      counter += 1;
      const tx = line.split(' ').filter((entry) => {return entry.trim() !== ''});
      txin += tx[0] + '#' + tx[1] + ' --tx-in '
      tokens = getTokens(tx.slice(2).reverse(), tokens)
    }
  });
  txin = txin.slice(0, -9);
  return [txin, tokens, counter];
};


/**
 * Query the chain tip.
 * @return {Promise}
 */
 const tip = () => {
  const command = `cardano-cli query tip ${MAINNET}`;
  return shell.run(command);
};


/**
 * Create the minting string.
 * @param {int} low
 * @param {int} high
 * @param {string} policyId
 * @param {string} assetBase
 * @param {int} precision optional
 * @return {string}
 */
const mintingString = (low, high, policyId, assetBase, precision=5) => {
  let mString = '"';
  for (let i = low; i <= high; i++) {
    mString += '1 '+policyId+'.'+assetBase+i.toString().padStart(precision, "0")+' + ';    
  }
  mString = mString.slice(0, -3)
  mString += '"'
  return mString;
};

/**
 * Create a custom --tx-out given an array of addresses and tokens.
 * @param {string} sender A public address of the sender, for change.
 * @param {object} tokens The bank of available tokens to send.
 * @param {object} addresses An object of addresses and values.
 */
// TODO Declare implementation / Refactor to make it declarative.
// TODO Use format strings in function implementation rather than appending string fragments.
const customTxOut = (sender, tokens, addresses) => {
  // https://docs.cardano.org/en/latest/native-tokens/minimum-ada-value-requirement.html
  // TODO Clarify what this means:
  // MiniADA is actually a calculation.
  const minADA = 1481480; // TODO Use Naming conventions for constants: const MIN_ADA = ...
  let txout = '';
  // TODO Rephrase with functionality
  //      Filter through all output addresses to do ...
  //      For all output addresses do ...
  //      For all Buyers do ...
  // Loop all output address
  for (const addr in addresses) {
    txout += addr +'+'+ minADA + '+'; // TODO use format strings
    const amounts = addresses[addr];
    // amounts is an object of tokens to be sent
    txout += '"' // TODO Use format strings
    for (const id in amounts) {
      const amt = amounts[id];
      txout += ''+ amt + ' ' + id + ' + ' // TODO use format strings
      tokens[id] -= amt; // account for tokens being sent out for change.
    }
    txout = txout.slice(0, -3); // TODO Clarify purpose
    txout += '" --tx-out '; 
  }
  // Calculate lovelace cost.
  const N = Object.keys(addresses).length;
  tokens.lovelace -= N*minADA; // TODO Document this formula, Why / How it is used, etc...
  
  txout += sender +'+'+ tokens.lovelace + '+';
  txout += '"'
  for (const key in tokens){
    if (key !== 'lovelace') {
      txout += ''+tokens[key] + ' ' + key + ' + '
    }
  }
  txout = txout.slice(0, -3);
  txout += '"'
  return txout;
};


/**
 * Builds a transaction.
 * 
 * @param {string} inputs The concat tx-in string.
 * @param {string} addr The senders address
 * @param {int} balance The senders lovelace balance.
 * @param {string} mint The minting string.
 * @param {int} fee The trx fee.
 * @param {int} final The final slot.
 * @param {file} metadata The metadata file.
 * @return {Promise}
 * 
 * @todo remove output file condition into named pipe.
 */
 const buildRawMint = (inputs, outputs, mint, fee, final, metadata, outfile) => {
  const command = `cardano-cli transaction build-raw \
    --mary-era \
    --tx-in ${inputs} \
    --tx-out ${outputs} \
    --mint ${mint} \
    --fee ${fee} \
    --invalid-before ${final} \
    --metadata-json-file ${metadata} \
    --out-file ${outfile}`;
  return shell.run(command);
};

/**
 * Builds a transaction.
 * 
 * @param {string} inputs The concat tx-in string.
 * @param {string} outputs The senders address
 * @param {int} fee The trx fee.
 * @param {int} final The final slot.
 * @param {file} metadata The metadata file.
 * @return {Promise}
 * 
 * @todo remove output file condition into named pipe.
 */
 const buildRaw = (inputs, outputs, fee, final, metadata, outfile) => {
  const command = `cardano-cli transaction build-raw \
    --mary-era \
    --tx-in ${inputs} \
    --tx-out ${outputs} \
    --fee ${fee} \
    --invalid-before ${final} \
    --metadata-json-file ${metadata} \
    --out-file ${outfile}`;
  return shell.run(command);
};

/**
 * Calculate the fee for a transaction
 * @param {int} txInCount Number of input utxo.
 * @param {int} txOutCount Number of output utxo.
 * @return {Promise}
 */
 const fee = (txInCount, txOutCount) => {
  const command = `cardano-cli transaction calculate-min-fee \
  --tx-in-count ${txInCount} \
  --tx-out-count ${txOutCount} \
  --witness-count 1 \
  ${MAINNET} \
  --tx-body-file tx.draft \
  --protocol-params-file protocol.json`;
  return shell.run(command);
};

/**
 * Calculate the fee for a transaction
 * @param {file} minterSKey The minter's private payment key.
 * @param {file} policySKey The policy's private minting key.
 * @param {file} policyScript The policy script.
 * @return {Promise}
 */
 const signMint = (minterSKey, policySKey, policyScript) => {
  const command = `cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file ${minterSKey} \
  --signing-key-file ${policySKey} \
  --script-file ${policyScript} \
  ${MAINNET} \
  --out-file tx.signed`;
  return shell.run(command);
};

/**
 * Calculate the fee for a transaction
 * @param {file} minterSKey The minter's private payment key.
 * @param {file} policySKey The policy's private minting key.
 * @param {file} policyScript The policy script.
 * @return {Promise}
 */
 const sign = (minterSKey) => {
  const command = `cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file ${minterSKey} \
  ${MAINNET} \
  --out-file tx.signed`;
  return shell.run(command);
};

/**
 * Calculate the fee for a transaction
 * @param {file} minterSKey The minter's private payment key.
 * @param {file} policySKey The policy's private minting key.
 * @param {file} policyScript The policy script.
 * @return {Promise}
 */
 const submit = () => {
  const command = `cardano-cli transaction submit \
  --tx-file tx.signed \
  ${MAINNET}`;
  return shell.run(command);
};

// Export
export default {
  write, // TODO Move to file utilities etc... Not transaction specific
  read, // TODO Move to file utilities etc... Not transaction specific
  params,
  utxo,
  processUtxo,
  tip,
  mintingString,
  buildRawMint,
  buildRaw,
  fee,
  signMint,
  sign,
  submit,
  customTxOut
};
