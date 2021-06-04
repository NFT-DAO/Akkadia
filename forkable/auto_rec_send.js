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
import sendable from './sendable.js' // TODO Descriptive naming. What is sendable?
import sending from './sending.js'   // TODO Descriptive naming. What is sending?


// TODO Indicate purpose of this address. Is this an alternate Wallet?
// const addr = "addr1qxw7euxnwx97tnplzq6x4whwv5t70gynlpjjy6z05yfxsvcq2e2yyynhaquuazkyg9qgrup7fsu74ldpfwfq54nz4lyqz9mkjv"; // Mainnet Addr

// TODO Store this as an Environment Variable.
//      Otherwise if Sender address needs to be changed
//      You will have to redeploy the backend code.
const addr = "addr_test1qptwsg05y2che7qh92kwytmng590lejhg56lw9y545c80m6c68z7xtgq7z6wf4d3jnv7mnm5hlprsyt78f0jnvmmx88sqawvjk"; // Testnet Addr

// TODO Indicate purpose / Remove if unused.
const amt = 1;

// TODO Indicate purpose / Remove if unused.
const token = "Testcoin"

// TODO Document and clarify functionality
//      This function seems to:
//      1. Query for all transactions to an address, presumably the Sender Address.
//      2. Dispatch NFTs to all these transaction addresses.
//         Does it filter out Buyers it has dispatched NFTs to?
//         Does keep a record of Buyers who have received the NFTs they purchased?
// TODO Declare our intentions. The function body calls:
//      1. sendable.find_all_trx
//         We find all transactions to an address, presumably the Sender Address.
//
//         It will be clearer if we renamed this to `find_all_buyers` and updated the functionality.
//
//      2. We call sendable.helper on all transactions.
//
//         It is unclear what sendable.helper is supposed to do.
//
//         For example if the logic is to:
//         A. Filter Buyers who have not received their NFTs
//         B. Send them the NFTs,
//
//         sendable.helper could be broken up into:
//         A. filter_unsent_buyers()
//         B. send_NFT_to_buyers()
//         which makes the functionality apparent.
function autoReceiveThenAddToDB(addr){
    sendable.find_all_trx(addr).then((res) => { // TODO Use better variables other than res
        // TODO Purge unused comments / use a logger for DEBUG logging.
        // console.log(res)
        sendable.helper(res, addr, []).then((data) => {
            // TODO Update with actual DB logic
            console.log('INSERT IF NOT EXIST')
            // TODO Update with actual DB logic
            console.log(data) // This goes to the DB
        })
    })
    // TODO Make this configurable.
    //      Move this logic out to a cron job /
    //      Store cycle duration (60,000ms) in an Environment Variable.
    setTimeout(() => {autoReceiveThenAddToDB(addr)}, 60000);
}

autoReceiveThenAddToDB(addr);
