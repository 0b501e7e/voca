# School of Computing &mdash; Year 4 Project Proposal Form

> Edit (then commit and push) this document to complete your proposal form.
> Make use of figures / diagrams where appropriate.
>
> Do not rename this file.

## SECTION A

|                     |                   |
|---------------------|-------------------|
|Project Title:       | E.I.R.E           |
|Student 1 Name:      | Senan Warnock     |
|Student 1 ID:        | 20752725          |
|Student 2 Name:      | Zak Smith         |
|Student 2 ID:        | 20723579          |
|Project Supervisor:  | Geoffrey Hamilton |

> Ensure that the Supervisor formally agrees to supervise your project; this is only recognised once the
> Supervisor assigns herself/himself via the project Dashboard.
>
> Project proposals without an assigned
> Supervisor will not be accepted for presentation to the Approval Panel.

## SECTION B

> Guidance: This document is expected to be approximately 3 pages in length, but it can exceed this page limit.
> It is also permissible to carry forward content from this proposal to your later documents (e.g. functional
> specification) as appropriate.
>
> Your proposal must include *at least* the following sections.


### Introduction

> With the burgeoning adoption of the Ethereum network, its scalability has become a conspicuous obstacle, precipitating unmanageable fees and impeding transaction throughput under high usage. "Efforts in Incremental Rescaling of Ethereum" (E.I.R.E) emerges from the need to address these challenges, employing zero-knowledge cryptography as a pathway towards scalable, secure, and cost-effective transaction processing on the network.

### Outline

> The "E.I.R.E" Project, acronymic for "Efforts in Incremental Rescaling of Ethereum," anchors its vision on alleviating the persisting scalability woes of the Ethereum network by judiciously leveraging the capabilities of zero-knowledge proofs. Focused on magnifying transaction throughput without besieging the network with additional load, our approach is bifurcated into a primary and a secondary objective, each one being a viable path to tackling the outlined problem.

> Primary Objective: Our paramount aim is to engineer a Zero-Knowledge Virtual Machine (ZKVM) that allows general computations to be performed off-chain, while maintaining a secure and verifiable link to the Ethereum mainnet. This encompasses:

> Constructing a Minimalistic VM: Developing a virtual machine with a confined instruction set to validate the concept of executing assorted computations off-chain.
> Zero-Knowledge Circuits: Drafting zk-SNARK or zk-STARK circuits that confirm the veracity of computations made by our VM without unveiling the intrinsic data of the operations.
> Batch Verification & On-Chain Synchronization: Implementing a system to batch verification proofs and subsequently synchronize them with the Ethereum mainnet, confirming the integrity and reliability of off-chain computations.
> In the realm of this objective, it's noteworthy to underscore that the VM isn't a pathway to scaling; rather, it provides a platform for a variety of computations to be executed off-chain, while zero-knowledge proofs ensure these computations can be verified on-chain without executing them directly, thereby saving computational resources and enhancing transaction throughput.

> Secondary Objective: Should the development of the ZKVM encounter intractable challenges or be inhibited by time constraints, our initiative will pivot to sculpting a Zero-Knowledge Rollup, distinctly focusing on enhancing the Ethereum network's transaction scalability by utilizing zero-knowledge proofs to validate batched transactions off-chain before they are recorded on-chain. The major architectural facets will include:

> Transaction Aggregator: Implementing an off-chain component responsible for collecting, batching, and managing numerous transactions efficiently.
> Zero-Knowledge Proof Generation: Developing a mechanism to create zero-knowledge proofs that affirm the legitimacy of batched transactions without revealing their intrinsic details.
> On-Chain Verifier: Embedding an on-chain component tasked with scrutinizing and verifying the provided zero-knowledge proofs, thereby ensuring the genuineness and security of transactions before they’re permanently recorded on the blockchain.
> Our journey through the E.I.R.E project will delve deep into intricate blockchain paradigms, exploring novel methodologies to scale the Ethereum network while preserving its decentralization and security tenets, with our north star being a more scalable, accessible, and user-friendly blockchain.

### Background

> Ethereum, since its advent, has been at the forefront of the decentralized finance and applications revolution, wielding a robust platform that fosters decentralization and inclusivity. However, its scalability issues, notably slowed transaction speeds and soaring gas fees during peak periods, have been a persistent bottleneck for developers and users alike. E.I.R.E, acronymic for “Efforts in Incremental Rescaling of Ethereum,” emerges from a critical need to address these scalability and cost concerns. Rooted in previous advancements and deployments of zero-knowledge proofs, particularly zk-SNARKs and zk-STARKs, in varied blockchain projects, the concept behind E.I.R.E springs from a foundation that endeavors to merge proven cryptographic theories with pragmatic, scalable solutions for the Ethereum network.

### Achievements

> The E.I.R.E project aims to yield:

> Developers: A pragmatic mechanism enabling secure, scalable, and economically feasible transactions on the Ethereum network through leveraging off-chain computations and zero-knowledge proofs.
> Users: An enhanced user experience on the Ethereum network marked by reduced transaction fees and amplified transaction throughput without compromising on security or transparency.

### Justification

> As decentralized applications (dApps) continue to burgeon across various sectors, the imperatives of scalability, security, and cost-effectiveness become increasingly pivotal. By addressing the Ethereum network's scalability and fee dilemmas through E.I.R.E, we are not only ensuring a fortified, efficient, and secure platform for decentralized application (dApp) development but also curating a framework that potentially catalyzes further innovations in the blockchain domain. In a landscape where the potency of blockchain is intrinsically tied to its accessibility and utility, E.I.R.E strives to be a cornerstone that bolsters Ethereum's capability to seamlessly and securely handle a more voluminous transactional load.

### Programming language(s)

> Solidity, Rust, Javascript
### Programming tools / Tech stack

> Circom, Foundry

### Hardware

> N/A

### Learning Challenges

> The journey through E.I.R.E will necessitate a nuanced understanding and adeptness in:

>Rust: Given its safety and performance attributes, deploying Rust in certain backend structures related to blockchain interactions will be vital.
> Circom: As a language and toolset for creating zk-SNARK circuits, achieving proficiency in Circom will be indispensable for crafting efficient zero-knowledge proofs.
> Zero-Knowledge Cryptography: Gaining a profound comprehension of zero-knowledge proofs, specifically zk-SNARKs and zk-STARKs, to ensure secure, private, and verifiable transactions.
> Virtual Machine (VM) Architecture: An enriched understanding of VM architecture to facilitate the design and implementation of our minimalistic VM effectively and efficiently.

### Breakdown of work

> Clearly identify who will undertake which parts of the project.
>
> It must be clear from the explanation of this breakdown of work both that each student is responsible for
> separate, clearly-defined tasks, and that those responsibilities substantially cover all of the work required
> for the project.

#### Student 1

> Zero-Knowledge Component Development:

> Formulate and fine-tune zk-SNARK or zk-STARK circuits, ensuring a confidential and verifiable link between off-chain computations and on-chain validations.

> Undertake extensive testing of zk circuits to substantiate their efficacy in proof generation without disclosing underlying data.


> Virtual Machine (VM) Development:

> Spearhead the conception and development of a minimalistic VM, focusing on executing simple computations off-chain, verified through the zero-knowledge circuits.
> Ensure the seamless integration of VM operations with zk circuits, facilitating authentic and reliable proof generation.

> Integration and Interaction with Node/Sequencer Components:

> Work closely with Zak in areas where the VM and zk components interact with the node/sequencer components, ensuring a smooth flow and interaction between off-chain and on-chain elements.

#### Student 2

> Node/Sequencer Component Development:

> Govern the architecture and establishment of node/sequencer components, overseeing the aggregation of transactions, generating zk proofs utilizing the circuits crafted by Senan, and submitting them to the Ethereum mainnet.
> Ascertain that the node/sequencer efficiently and securely manages transactions, proofs, and communicates efficaciously with the Ethereum network.

> On-Chain Verification Component Development:

> Oversee the development of robust on-chain components that effectively verify zk proofs and finalize batched transactions on the Ethereum mainnet, ensuring operations are gas-efficient and secure.

> Collaborative Development with zk and VM Components:

> Collaborate with Senan in developmental areas that require interaction and data exchange between the zk and VM components and the node/sequencer, ensuring coherent and reliable system functionality.


## Example

> Example: Here's how you can include images in markdown documents...

<!-- Basically, just use HTML! -->

<p align="center">
  <img src="./res/cat.png" width="300px">
</p>

