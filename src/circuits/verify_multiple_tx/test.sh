#!/bin/bash

# Stop the script on the first error encountered
set -e

# Compilation
echo "Compiling multiple_token_transfer_withdraw.circom..."
circom multiple_token_transfer_withdraw.circom --r1cs --wasm --sym

# Input Generation
echo "Generating inputs..."
node generate.js

# Witness Generation
echo "Generating witness..."
cd multiple_token_transfer_withdraw_js
node generate_witness.js multiple_token_transfer_withdraw.wasm ../input.json ../witness.wtns

# Powers of Tau Ceremony
echo "Starting new Powers of Tau ceremony..."
snarkjs powersoftau new bn128 17 pot17_0000.ptau -v

# Contribute to ceremony
# TODO: Replace the echo "randomstring" with an actual random string
echo "Contributing to ceremony..."
echo "randomstring" | snarkjs powersoftau contribute pot17_0000.ptau pot17_0001.ptau --name="First contribution" -v

# Phase 2
echo "Preparing phase 2..."
snarkjs powersoftau prepare phase2 pot17_0001.ptau pot17_final.ptau -v

# Generate the .zkey file
echo "Generating .zkey file..."
snarkjs groth16 setup ../multiple_token_transfer_withdraw.r1cs pot17_final.ptau multiple_token_transfer_withdraw_0000.zkey

# Contribute to Phase 2 of the ceremony
echo "Contributing to Phase 2 of the ceremony..."
echo "randomstring" | snarkjs zkey contribute multiple_token_transfer_withdraw_0000.zkey multiple_token_transfer_withdraw_0001.zkey --name="1st Contributor Name" -v

# Export the Verification key
echo "Exporting the verification key..."
snarkjs zkey export verificationkey multiple_token_transfer_withdraw_0001.zkey verification_key.json

# Generate the Proof
echo "Generating the proof..."
snarkjs groth16 prove multiple_token_transfer_withdraw_0001.zkey ../witness.wtns proof.json public.json

# Verify the Proof
echo "Verifying the proof..."
snarkjs groth16 verify verification_key.json public.json proof.json

echo "All operations completed successfully!!"
