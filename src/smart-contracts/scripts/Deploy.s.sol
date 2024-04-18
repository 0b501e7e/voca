// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/poseidon.sol";
import "../src/rollup.sol";


contract myScript is Script {
    function run() external {
        uint256 privKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privKey);

        // Deploy Poseidon2
        Poseidon2 poseidon2 = new Poseidon2();
        // Deploy Poseidon4
        Poseidon4 poseidon4 = new Poseidon4();
        // Deploy Poseidon5
        Poseidon5 poseidon5 = new Poseidon5();
        // Deploy PoseidonMerkle
        PoseidonMerkle poseidonMerkle = new PoseidonMerkle(address(poseidon2), address(poseidon4), address(poseidon5));
        // Deploy Rollup
        Rollup rollup = new Rollup(address(poseidonMerkle));
    }
}