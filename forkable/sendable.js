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
import blockfrost from './blockfrost.js'

// TODO Abstract to environment variable.
const price = '2000000'; // Lovelace
// TODO Remove if unused / Declare purpose if used.
const minimum = 200000

/**
 * 
 * @param {string} sender The sender's public address.
 * @param {function} callback future callback for bd
 */
// TODO Ensure full list is returned.
//      Currently `getAddressHistory` retrieves only the first 100 transactions,
//      due to endpoint parameter defaults.
// TODO Refactor function logic, according to upstream comments (in `auto_rec_send.js`).
const find_all_trx = (sender, callback=()=>{}) => {
  return blockfrost.getAddressHistory(sender).then((history) => {
    // TODO Implement proper logging
    // console.log(history)
    if (history.data === undefined) {
      return []
    } else {
      return history.data;
    }
  });
};

// TODO Rename function according to its intended purpose
// TODO Refactor function logic, according to upstream comments (in `auto_rec_send.js`).
// TODO Fix function interface and associated logic:
//      all_tx, addresses both serve the same purpose of providing buyer addresses.
const helper = (all_tx, sender, addresses) => {
  if (all_tx.length === 0) {return addresses}
  const tx = all_tx[0]
  return build_sendable(tx, sender).then((addr)=>{
    // console.log(addr)
    if (addr !== '') { // TODO: Improve validation logic
      addresses.push(addr)
    }
    return helper(all_tx.slice(1), sender, addresses)
    
  })
};

// TODO Rename function according to intended purpose. E.g. send_NFTs etc...
const build_sendable = (tx, sender) => {
  return blockfrost.getTrxIOInfo(tx).then((res) => {
    // INPUTS // OUTPUTS
    const inputs = res.data.inputs;
    const outputs = res.data.outputs;
    // TODO Defend against case that inputs is null / undefined / length 0
    const potential_address = inputs[0].address
    // OUTPUTS: assume constant stake address

    // TODO Abstract up validation logic.
    //      It is both located at 1. and 2.
    //      Move it into a function call.
    // TODO `flag` is used to denote valid transactions.
    //      This should be renamed appropriately.
    let flag = false;
    outputs.forEach(outs => {
      if (outs.address === sender) {
        const out_tokens = outs.amount
        out_tokens.forEach(tok => {
          // TODO 1.
          if (tok.unit === 'lovelace' && tok.quantity === price) {
            flag = true;
          }
        })
      }
    })
    if (flag === true) {
      // TODO 2.
      return confirm_single('', inputs, false, potential_address)
    } else {return ''}
  })
}

// TODO Document function purpose.
//      This makes the required function interface apparent.
// TODO Refactor function body into sequential validation steps.
// TODO Document function parameters and their usage.
const confirm_single = (status, inputs, breakout, potential_address) => {
  if (breakout) {
    // console.log('MULTIPLE STAKE')
    // Keep funds we have no way to prove who sent it.
    return ''
  }
  if (inputs.length === 0) {
    // console.log('ALL FROM ONE STAKE')
    // console.log(potential_address)
    // Insert into "to be sent" db if not exists in db
    return potential_address
  }
  if (status === '') {
    return blockfrost.getAddressInfo(inputs[0].address).then((value) => {
      status = value.data.stake_address;
      return confirm_single(status, inputs.slice(1), false, potential_address)
    });
  } else {
    return blockfrost.getAddressInfo(inputs[0].address).then((value) => {
      if (status !== value.data.stake_address) {
        return confirm_single(status, inputs.slice(1), true, potential_address)
      }
      return confirm_single(status, inputs.slice(1), false, potential_address)
    });
  }
};
  
export default {
  find_all_trx,
  build_sendable,
  helper
}
