// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract WithdrawVerifier {
    // Scalar field size
    uint256 constant withdrawR    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant withdrawQ   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant withdrawAlphax  = 598970058380205681572652260553263897343693424970452334797269442974207176495;
    uint256 constant withdrawAlphay  = 2304161520156836463631116028055165241887839887029995334935638928355713311882;
    uint256 constant withdrawBetax1  = 17273627949541863648141653591683256491736396504303520668290968810830136675765;
    uint256 constant withdrawBetax2  = 16925748650403096048619316179723455719164304139947400040435748257140239834072;
    uint256 constant withdrawBetay1  = 946212366245274494391349757978310311083458200345004210595359277056516664568;
    uint256 constant withdrawBetay2  = 19716509512711048283430882906197019372139969724276838592660134041318541283034;
    uint256 constant withdrawGammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant withdrawGammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant withdrawGammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant withdrawGammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant withdrawDeltax1 = 20488052502560455864814491461931846285515003382096245794076185254571698756087;
    uint256 constant withdrawDeltax2 = 9982457411686334673128753148741223186611910793567245134569056250196718103296;
    uint256 constant withdrawDeltay1 = 10919430947266730235234087923936892292502762579715285702096150038812796408375;
    uint256 constant withdrawDeltay2 = 17968090470523604326368888993729392170750273501301855516035348285291059563445;

    uint256 constant withdrawIC0x = 3200872422541888910269149212419392071126334937104293588164540380622348381564;
    uint256 constant withdrawIC0y = 4864618108803746348114723456549674900549553723464684958307176489179616895883;

    uint256 constant withdrawIC1x = 9903127660758546484903789912896903341415333943092748144688842785592568424967;
    uint256 constant withdrawIC1y = 14775795690791196559176537883330262673674055835579914333097821901061670741461;

    uint256 constant withdrawIC2x = 14392946080473313917981678512193841123676047675511702962580226557685957345679;
    uint256 constant withdrawIC2y = 13756935403474213097238434438695120191505026001421489142721001125137904059066;

    uint256 constant withdrawIC3x = 15188123557413891015800426970363223516940140779254082595813427734839332284203;
    uint256 constant withdrawIC3y = 11482916530634803940850196575839089852568527259695392821558529265435353195901;

    // Memory data
    uint16 constant withdrawPVk = 0;
    uint16 constant withdrawPPairing = 128;

    uint16 constant withdrawPLastMem = 896;


    function verifyWithdrawProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[3] calldata _pubSignals) public view returns (bool) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, withdrawQ)) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }
            
            // G1 function to multiply a G1 value(x,y) to value in an address
            function g1_mulAccC(pR, x, y, s) {
                let success
                let mIn := mload(0x40)
                mstore(mIn, x)
                mstore(add(mIn, 32), y)
                mstore(add(mIn, 64), s)

                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }

                mstore(add(mIn, 64), mload(pR))
                mstore(add(mIn, 96), mload(add(pR, 32)))

                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
                let _pPairing := add(pMem, withdrawPPairing)
                let _pVk := add(pMem, withdrawPVk)

                mstore(_pVk, withdrawIC0x)
                mstore(add(_pVk, 32), withdrawIC0y)

                // Compute the linear combination vk_x
                
                g1_mulAccC(_pVk, withdrawIC1x, withdrawIC1y, calldataload(add(pubSignals, 0)))
                
                g1_mulAccC(_pVk, withdrawIC2x, withdrawIC2y, calldataload(add(pubSignals, 32)))
                
                g1_mulAccC(_pVk, withdrawIC3x, withdrawIC3y, calldataload(add(pubSignals, 64)))
                

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(withdrawQ, calldataload(add(pA, 32))), withdrawQ))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), withdrawAlphax)
                mstore(add(_pPairing, 224), withdrawAlphay)

                // beta2
                mstore(add(_pPairing, 256), withdrawBetax1)
                mstore(add(_pPairing, 288), withdrawBetax2)
                mstore(add(_pPairing, 320), withdrawBetay1)
                mstore(add(_pPairing, 352), withdrawBetay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, withdrawPVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(withdrawPVk, 32))))


                // gamma2
                mstore(add(_pPairing, 448), withdrawGammax1)
                mstore(add(_pPairing, 480), withdrawGammax2)
                mstore(add(_pPairing, 512), withdrawGammay1)
                mstore(add(_pPairing, 544), withdrawGammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), withdrawDeltax1)
                mstore(add(_pPairing, 672), withdrawDeltax2)
                mstore(add(_pPairing, 704), withdrawDeltay1)
                mstore(add(_pPairing, 736), withdrawDeltay2)


                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, withdrawPLastMem))

            // Validate that all evaluations ∈ F
            
            checkField(calldataload(add(_pubSignals, 0)))
            
            checkField(calldataload(add(_pubSignals, 32)))
            
            checkField(calldataload(add(_pubSignals, 64)))
            
            checkField(calldataload(add(_pubSignals, 96)))
            

            // Validate all evaluations
            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            mstore(0, isValid)
             return(0, 0x20)
         }
     }
 }
