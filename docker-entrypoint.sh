#!/bin/bash

# This script expects the name of the circuit directory as the first argument
CIRCUIT_DIR=$1

# Navigate to the specified circuit directory and run its test.sh script
cd /app/circuits/$CIRCUIT_DIR
./test.sh
