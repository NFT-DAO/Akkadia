#!/bin/bash
set -e

## Create the metadata folder and cd
if [ -d metadata ] 
then
  exit 1
else
  mkdir -p metadata
fi
cd metadata

# Take in arguments for the args :)
jq -n '{"2021": $ARGS.named}' \
  --arg 1 "hash of purchase order" \
  --arg 2 "sales amount" \
  --arg 3 "link data" \
  --arg 4 "Purchase Order Information here" \
  --arg 5 "Acadia Marketplace" \
  >> metadata.json

cat metadata.json