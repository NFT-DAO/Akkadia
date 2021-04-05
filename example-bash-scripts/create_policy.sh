#!/bin/bash
set -e

# Create the policy folder and cd
if [ -d policy ] 
then
  exit 1
else
  mkdir -p policy
fi

cd policy

# Generate policy v/s key
cardano-cli address key-gen \
    --verification-key-file policy.vkey \
    --signing-key-file policy.skey

# Create policy script file
jq -n '{scripts: [$ARGS.named], type: "all"}' \
  --arg keyHash "$(cardano-cli address key-hash --payment-verification-key-file policy.vkey)" \
  --arg type "sig" \
  >> policy.script


# Create policy ID file
echo $(cardano-cli transaction policyid --script-file policy.script) >> policy.id
