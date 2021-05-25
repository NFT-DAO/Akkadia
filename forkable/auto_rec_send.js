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
import sendable from './sendable.js'
import sending from './sending.js'

// const addr = "addr1qxw7euxnwx97tnplzq6x4whwv5t70gynlpjjy6z05yfxsvcq2e2yyynhaquuazkyg9qgrup7fsu74ldpfwfq54nz4lyqz9mkjv"; // Mainnet Addr
const addr = "addr_test1qptwsg05y2che7qh92kwytmng590lejhg56lw9y545c80m6c68z7xtgq7z6wf4d3jnv7mnm5hlprsyt78f0jnvmmx88sqawvjk"; // Testnet Addr
const amt = 1;
const token = "Testcoin"

function autoReceiveThenAddToDB(addr){
    sendable.find_all_trx(addr).then((res) => {
        // console.log(res)
        sendable.helper(res, addr, []).then((data) => {
            console.log('INSERT IF NOT EXIST')
            console.log(data) // This goes to the DB
        })
    })
    setTimeout(() => {autoReceiveThenAddToDB(addr)}, 60000);
}
// Infinite Time Based Loop
autoReceiveThenAddToDB(addr);