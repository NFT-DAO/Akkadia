# Live Example

Create the policy. 
- Current example is mint anytime.

Create the metadata default format.
- Current metadata is temp data.

Create the minter wallets and keys.
- Random CLI wallet

Create the transaction
- Mint a token to the CLI wallet

Send tokens to another address
- Send ADA to the CLI wallet via QR Code 
- Put public address in receiver.addr
- Send 1.5 ADA + 1000000 NFTDAOTokens to receiver.addr

# Example Minting Use

- Send ADA to the minter's wallet address, minter_base.addr, found in the minter folder.
- I would recommend sending more than 2 ADA for fees and required dust. 
- Running create_tokens.sh will create 10,000,000 NFTDAOTokens inside the minter's wallet. 
- The script is very simple. The policy script always allows additional tokens to be minted at anytime.

# Example Sending Use
- Send ADA to the minter's wallet address, minter_base.addr, found in the minter folder.
- Sending ADA+Tokens requires 1.5 ADA for the sender and the receiver. So be sure to have the required
ADA inside the minter's wallet else the transaction will not be completed. 
- Put any public address in the receiver.addr file to receive tokens. 
- Running send_tokens.sh will send 1.5 ADA + 1,000,000 NFTDAOTokens to the public address and will return the change back to the minter's wallet.

# This is a real wallet with real ADA that can mint real TOKENS. Be Careful with your ADA!