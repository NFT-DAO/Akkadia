#!/bin/bash
set -e

NAME="minter"

# SENDER_ADDR=""
SENDER_ADDR=$(cat ${NAME}/${NAME}_base.addr)
MINTING=10000000
POLICY_ID=$(cat policy/policy.id)
ASSET_NAME="NFTDAOToken"
AMOUNT=1
num=1000000
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

# # # transaction variables
# TXNS=$(jq length utxo.json)
# alltxin=""
# TXIN=$(jq -r --arg alltxin "" 'keys[] | . + $alltxin + " --tx-in"' utxo.json)
# HEXTXIN=${TXIN::-8}
# BALANCE=$(jq .[].amount utxo.json | awk '{sum=sum+$0} END{print sum}' )

# # Next tip before no transaction
# cardano-cli query tip --mainnet --out-file tip.json
# TIP=$(jq .slotNo tip.json)
# DELTA=200000
# FINALTIP=$(( ${DELTA} + ${TIP} ))