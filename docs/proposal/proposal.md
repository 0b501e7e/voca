# School of Computing — Year 4 Project Proposal Form

## SECTION A

|                     |                   |
|---------------------|-------------------|
|**Project Title:**   | VOCA              |
|**Student 1 Name:**  | Senan Warnock     |
|**Student 1 ID:**    | 20752725          |
|**Student 2 Name:**  | Zak Smith         |
|**Student 2 ID:**    | 20723579          |
|**Project Supervisor:**| Geoffrey Hamilton|

## SECTION B

### Introduction

Ethereum's reach and potential are unparalleled in the decentralized domain. Yet, scalability remains its Achilles' heel. We introduce VOCA - Verifiable Off-Chain Computations are Awesome!

VOCA's primary goal is to introduce a zk rollup, offering an immediate and transformative scalability solution for Ethereum. If successful, an ambitious extension toward a Zero-Knowledge Virtual Machine (ZKVM) is envisioned, transitioning from a mere scaling solution to a foundational layer-2 network.

### Outline

VOCA's trajectory is methodically structured:

**Central Objective: Zero-Knowledge Rollup Development**

- **Transaction Aggregator:** Construct an off-chain mechanism for transaction collection and batching.
- **Zero-Knowledge Proof Generation:** Engineer a system to derive proofs that vouch for the integrity of batched transactions without revealing their particulars.
- **On-Chain Verifier:** Design a contract on Ethereum for the validation of these zero-knowledge proofs, ensuring security and authenticity.

**Aspirational Objective: Development of a Zero-Knowledge Virtual Machine (ZKVM)**

After the zk rollup's successful deployment:

- **Minimalistic VM:** Draft and implement a virtual machine for diverse off-chain computations.
- **Zero-Knowledge Circuit Integration:** Seamlessly amalgamate zk-SNARK or zk-STARK circuits with the VM, anchoring its computations to on-chain verifiability.
- **Layer-2 Network Evolution:** Harness the zkvm to evolve from a scaling solution to an expansive layer-2 network on Ethereum.

### Background

The significance of Ethereum in today's decentralized landscape is unassailable. VOCA's dual approach addresses the pressing scalability issues while laying the groundwork for a more integrated, comprehensive solution in the form of a layer-2 network.

### Achievements

VOCA's immediate target is the successful deployment of a zk rollup. Subsequently, with favorable circumstances and outcomes, the ambition is to pioneer the creation of a comprehensive layer-2 network integrating the zkvm.

### Justification

Ethereum's scalability conundrum is a pressing concern. Through VOCA's zk rollup, we anticipate immediate alleviation. The envisioned zkvm extension represents a vision of the future, positioning Ethereum as an even more formidable force in blockchain technology.

### Programming language(s)

Solidity, Rust, Javascript

### Programming tools / Tech stack

Circom, Foundry

### Hardware

N/A

### Learning Challenges

This project's ambitious nature presents multiple challenges:

- **Advanced Cryptography:** Grasping and mastering zk-SNARK and zk-STARK circuits require a deep dive into cryptographic principles.
- **Blockchain Architecture:** Understanding Ethereum's intricacies and optimizing for performance.
- **Virtual Machine Dynamics:** Navigating the complexities of VM design, ensuring seamless off-chain computation and on-chain validation.
- **Optimization:** Crafting efficient algorithms for transaction aggregation and batching, aiming for maximal throughput.
- **Interdisciplinary Integration:** Bridging the domains of frontend, backend, smart contract development, and cryptography into a cohesive, functional system.

### Breakdown of work

**Zero-Knowledge Rollup Development:**

#### Student 1

- **Smart Contracts:** Oversee the design and implementation of the On-Chain Verifier contract.
- **ZK Circuit Design:** Lead the formulation and refinement of zk-SNARK or zk-STARK circuits.

#### Student 2

- **Node Sequencer:** Manage the off-chain transaction aggregation mechanism, ensuring efficient and secure operation.
- **Frontend Development:** Spearhead the frontend design, ensuring user-friendly and intuitive interactions.

**ZKVM Development:**

Both students will tackle the VM development together and divide up the work as we approach this objective.

