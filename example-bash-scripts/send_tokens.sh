#!/bin/bash
set -e

NAME="minter"

SENDER_ADDR=$(cat ${NAME}/${NAME}_base.addr)
RECEIVER_ADDR=$(cat receiver.addr)
POLICY_ID=$(cat policy/policy.id)
ASSET_NAME="NFTDAOToken"
AMOUNT=1
num=1500000
AMOUNT=$(echo "${num}*${AMOUNT}" | bc)
AMOUNT=${AMOUNT%.*}

### Check if a directory does not exist ###
if [ -d transaction ] 
then
  echo "Folder Exists."
else
  mkdir -p transaction
fi

cd transaction

#
# Passive relay is required.
#
# Must have a live Network.Socket.connect
#
# cd $CNODE_HOME/scripts & source ./env
#

# protocol
cardano-cli query protocol-parameters \
--mary-era \
--mainnet \
--out-file protocol.json

# get utxo
cardano-cli query utxo \
--mary-era \
--cardano-mode \
--mainnet \
--address ${SENDER_ADDR} \
--out-file utxo.json

# transaction variables
TXNS=$(jq length utxo.json)
alltxin=""
TXIN=$(jq -r --arg alltxin "" 'keys[] | . + $alltxin + " --tx-in"' utxo.json)
HEXTXIN=${TXIN::-8}
TOTAL_BALANCE=$(jq .[].amount utxo.json | awk '{sum=sum+$0} END{print sum}' )
ADA_BALANCE=$(jq .[].amount utxo.json | jq .[0]| awk '{sum=sum+$0} END{print sum}')
TOKEN_BALANCE=$(( ${TOTAL_BALANCE} - ${ADA_BALANCE} ))
echo "ADA" ${ADA_BALANCE}
echo "TOKEN" ${TOKEN_BALANCE}


# Next tip before no transaction
cardano-cli query tip --mainnet --out-file tip.json
TIP=$(jq .slotNo tip.json)
DELTA=200000
FINALTIP=$(( ${DELTA} + ${TIP} ))

TOKEN_AMT=1000000
MINTING=$(( ${TOKEN_BALANCE} - ${TOKEN_AMT} ))
MINT="${MINTING} ${POLICY_ID}.${ASSET_NAME}"
SENDING="${TOKEN_AMT} ${POLICY_ID}.${ASSET_NAME}"

# echo "Building Draft Transaction"
cardano-cli transaction build-raw \
--mary-era \
--fee 0 \
--tx-in $HEXTXIN \
--tx-out ${RECEIVER_ADDR}+${AMOUNT}+"${SENDING}" \
--tx-out ${SENDER_ADDR}+${ADA_BALANCE}+"${MINT}" \
--metadata-json-file "../metadata/metadata.json" \
--invalid-hereafter $FINALTIP \
--out-file tx.draft

# echo "Calculating Transaction Fee"
FEE=$(cardano-cli transaction calculate-min-fee \
--tx-body-file tx.draft \
--tx-in-count ${TXNS} \
--tx-out-count 2 \
--witness-count 3 \
--mainnet \
--protocol-params-file protocol.json \
| tr -dc '0-9')

# echo $SENDER "has" $BALANCE "ADA"
echo "The fee is" ${FEE} "to move" ${AMOUNT} "Lovelace"
CHANGE=$(( ${ADA_BALANCE} - ${FEE} ))
CHANGE=$(( ${CHANGE} - ${AMOUNT} ))
echo "The change is" ${CHANGE}


# echo "Building Raw Transaction"
cardano-cli transaction build-raw \
--mary-era \
--fee $FEE \
--tx-in $HEXTXIN \
--tx-out ${RECEIVER_ADDR}+${AMOUNT}+"${SENDING}" \
--tx-out ${SENDER_ADDR}+${CHANGE}+"${MINT}" \
--metadata-json-file "../metadata/metadata.json" \
--invalid-hereafter $FINALTIP \
--out-file tx.raw

# echo "Signing Transaction"
cardano-cli transaction sign \
--tx-body-file tx.raw \
--signing-key-file "../minter/minter_payment.skey" \
--mainnet \
--out-file tx.signed

###### THIS MAKES IT LIVE #####################################################
cardano-cli transaction submit \
--tx-file tx.signed \
--mainnet
###############################################################################