# VOCA User Manual

This user manual provides detailed instructions for setting up and operating the VOCA zero knowledge rollup. It covers the setup of the operator node as well as the deployment of the smart contracts necessary for for the network to function.


## Setting Up the Operator Node

To get the operator node up and running, follow these steps:

### 1. Install Dependencies

Navigate to the directory of the operator node and install the required dependencies by running: ```npm install```


### 2. Configure Environment

Ensure all necessary environment variables are set by updating the `.env` file in the root directory of the operator node.

### 3. Start the Operator Node

Launch the operator node by running the following command in the root directory:

```node app.js```

This will initiate the operator node using the configurations specified in the `.env` file.

## Deploying the Smart Contracts

Deployment of the smart contracts involves building the contracts and deploying them via a script.

### 1. Build the Contracts

From the root directory of the smart contracts, execute the following command to build the smart contracts:

```forge build```


### 2. Deploy Contracts

Deploy the necessary hashing and the rollup contracts by running the `poseidon.js` script:

```node poseidon.js```

This step deploys the contracts needed for the zk rollup operation.

## Conclusion

Following these steps will set up the zk rollup environment. The smart contracts will be deployed and the operator will listen for deposit events and process them as they come.



