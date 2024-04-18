// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Rollup.sol";
import "../src/poseidon.sol";
import "../src/TestToken.sol";

contract RollupTest is Test {
    Rollup private rollup;
    PoseidonMerkle private poseidonMerkle;
    TestToken private testToken;

    function setUp() public {
        poseidonMerkle = new PoseidonMerkle(address(new Poseidon2()), address(new Poseidon4()), address(new Poseidon5()));
        rollup = new Rollup(address(poseidonMerkle));
        testToken = new TestToken();
    }

    function testDeployContracts() public {
        assert(address(rollup) != address(0));
        assert(address(testToken) != address(0));
    }

    function testTokenRegistration() public {
        rollup.registerToken(address(testToken));
        assertTrue(rollup.pendingTokens(address(testToken)));
    }

    function testApproveToken() public {
        rollup.registerToken(address(testToken));
        rollup.approveToken(address(testToken));
        assertEq(rollup.numTokens(), 2);
        assertEq(rollup.registeredTokens(2), address(testToken));
    }

    function testDeposits() public {
        uint[2] memory pubkey = [uint(123), uint(456)];
        rollup.deposit(pubkey, 1000, 2);
        // Verify state changes or events
    }

    function testProcessDeposits() public {
        // Setup initial state
        uint[2] memory pubkey = [uint(123), uint(456)];
        rollup.deposit(pubkey, 1000, 2);

        // You need to prepare the proofs and positions here
        uint[] memory position = new uint[](1);
        position[0] = 0;

        uint[] memory proof = new uint[](1);
        proof[0] = poseidonMerkle.hashPoseidon([uint256(1234)]);

        rollup.processDeposits(2, position, proof);
        // Check results after processing
    }

    function testWithdraw() public {
        // Simulate the withdrawal
        uint[9] memory txInfo = [uint(123), uint(456), 1, uint(0), uint(0), 0, 100, 1, uint(123456)];
        uint[] memory position = new uint[](1);
        position[0] = 0;

        uint[] memory proof = new uint[](1);
        proof[0] = poseidonMerkle.hashPoseidon([uint256(1234)]);

        rollup.withdraw(txInfo, position, proof, address(0x123));
        // Verify effects
    }
}
