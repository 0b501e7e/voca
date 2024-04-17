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

contract Groth16Verifier {
    // Scalar field size
    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant alphax  = 10400365267645737717528155183303762920966552752189236303326702479780432881223;
    uint256 constant alphay  = 6813477857777666511285059681989687263998777612589780508148234422058370012620;
    uint256 constant betax1  = 15421680365758408412778816572312523737959068746677206640820185039947633220799;
    uint256 constant betax2  = 10369668253115407628884437476922194257901857815052422281041498078600207042898;
    uint256 constant betay1  = 18170356028323396680907504907331315462126511315349182625994350130649172088871;
    uint256 constant betay2  = 16271651983424769704620333989098595830589671171974800185753696546215079415740;
    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant deltax1 = 21478160733307977971986973686576603894581073867879533358234969318423327388137;
    uint256 constant deltax2 = 11454309912562611041131418196484918564037228651353930742115734741451123712178;
    uint256 constant deltay1 = 20886666807691298813772921840500868242601927813646676349522744156575596670876;
    uint256 constant deltay2 = 14732814365084859584795236897184239147409769196262760995713938748868479141605;

    
    uint256 constant IC0x = 5972555137817011117139738174949845510462349092942197749106122866881834280139;
    uint256 constant IC0y = 15964887565122552060432169864648867823430841460121761925322986869248071084777;
    
    uint256 constant IC1x = 6648361206735640859783355360747213118129751026214680675735465425959701946044;
    uint256 constant IC1y = 5670776236826506575397135674881687230061681852943141676714664779241999807975;
    
    uint256 constant IC2x = 16361885671020708218313080527673110960810653238800404747757830714264321644606;
    uint256 constant IC2y = 21818810563656944316953470365174418995065148159832448007232073394255847191639;
    
    uint256 constant IC3x = 15377209767443669791406225344887199274714263763892245785435439134292078780431;
    uint256 constant IC3y = 3296205197268340556376859752959059913681391905920293603780222778355416905344;
    
    uint256 constant IC4x = 17173083022088501342640566095560181825960845466399813660170801096006641166741;
    uint256 constant IC4y = 1906063062728755663543494171114214836498024598450845230515353113774339402559;
    
    uint256 constant IC5x = 19861635638295462266226907303317483945483967725428974824484951976892023563660;
    uint256 constant IC5y = 17191578612368980503017662027591485171212293266879902136872889860827445754348;
    
    uint256 constant IC6x = 1644794670240726253150273984976365482807052134472141930797680102004436290689;
    uint256 constant IC6y = 4146869317232981011404965271334638475908240118916027444942160613189230257977;
    
    uint256 constant IC7x = 18872797838060017781516026357728142010525229553534931999399676221792665385401;
    uint256 constant IC7y = 8313356384935444670655453812286405591085113280656702589543016028332342652376;
    
    uint256 constant IC8x = 18196846737506426416984665295512034232820506395439052177339947772726617121414;
    uint256 constant IC8y = 9124812091593870195564877313399086198058217895868331869638405878648772906980;
    
    uint256 constant IC9x = 4607092424288000440145751622110170902296794742556820613100069692255239905699;
    uint256 constant IC9y = 14212175123669068490251715358706531287896300787939815882332173082505636458993;
    
    uint256 constant IC10x = 1932190789116110641750585745976124826032648022165426778371498853600229343899;
    uint256 constant IC10y = 5383391676525376459838029624366779308325743609140814190818678884600604485512;
    
    uint256 constant IC11x = 21372387743409912661381659908934769753934803230489266810678213442153890053415;
    uint256 constant IC11y = 19353674214378162887060128766312690022817740603579159165055456841363586833960;
    
    uint256 constant IC12x = 13152787944514094054836942971037098735113196438701486346498939343018637399175;
    uint256 constant IC12y = 8479297962358353080229547194635989899021641574515681935976099756598884122680;
    
    uint256 constant IC13x = 13182145675545332894102117238349148942475039737678720805473526298552226970315;
    uint256 constant IC13y = 17838715511397664776117728042749442029991480931081453328851472162162267583453;
    
    uint256 constant IC14x = 21656937887644683206393374615118104709902500312143743027677192045377810698738;
    uint256 constant IC14y = 2229792742048529352337439703110066771582996238564586289908994336545840304155;
    
    uint256 constant IC15x = 17596303527156536888709082846690138602360864824996181898255429916985672357503;
    uint256 constant IC15y = 19513046846425751860482710728354183502663686486448821728605081774264067378606;
    
 
    // Memory data
    uint16 constant pVk = 0;
    uint16 constant pPairing = 128;

    uint16 constant pLastMem = 896;

    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[15] calldata _pubSignals) public view returns (bool) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, q)) {
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
                let _pPairing := add(pMem, pPairing)
                let _pVk := add(pMem, pVk)

                mstore(_pVk, IC0x)
                mstore(add(_pVk, 32), IC0y)

                // Compute the linear combination vk_x
                
                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))
                
                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))
                
                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))
                
                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))
                
                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))
                
                g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))
                
                g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))
                
                g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))
                
                g1_mulAccC(_pVk, IC9x, IC9y, calldataload(add(pubSignals, 256)))
                
                g1_mulAccC(_pVk, IC10x, IC10y, calldataload(add(pubSignals, 288)))
                
                g1_mulAccC(_pVk, IC11x, IC11y, calldataload(add(pubSignals, 320)))
                
                g1_mulAccC(_pVk, IC12x, IC12y, calldataload(add(pubSignals, 352)))
                
                g1_mulAccC(_pVk, IC13x, IC13y, calldataload(add(pubSignals, 384)))
                
                g1_mulAccC(_pVk, IC14x, IC14y, calldataload(add(pubSignals, 416)))
                
                g1_mulAccC(_pVk, IC15x, IC15y, calldataload(add(pubSignals, 448)))
                

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), alphax)
                mstore(add(_pPairing, 224), alphay)

                // beta2
                mstore(add(_pPairing, 256), betax1)
                mstore(add(_pPairing, 288), betax2)
                mstore(add(_pPairing, 320), betay1)
                mstore(add(_pPairing, 352), betay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))


                // gamma2
                mstore(add(_pPairing, 448), gammax1)
                mstore(add(_pPairing, 480), gammax2)
                mstore(add(_pPairing, 512), gammay1)
                mstore(add(_pPairing, 544), gammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), deltax1)
                mstore(add(_pPairing, 672), deltax2)
                mstore(add(_pPairing, 704), deltay1)
                mstore(add(_pPairing, 736), deltay2)


                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, pLastMem))

            // Validate that all evaluations ∈ F
            
            checkField(calldataload(add(_pubSignals, 0)))
            
            checkField(calldataload(add(_pubSignals, 32)))
            
            checkField(calldataload(add(_pubSignals, 64)))
            
            checkField(calldataload(add(_pubSignals, 96)))
            
            checkField(calldataload(add(_pubSignals, 128)))
            
            checkField(calldataload(add(_pubSignals, 160)))
            
            checkField(calldataload(add(_pubSignals, 192)))
            
            checkField(calldataload(add(_pubSignals, 224)))
            
            checkField(calldataload(add(_pubSignals, 256)))
            
            checkField(calldataload(add(_pubSignals, 288)))
            
            checkField(calldataload(add(_pubSignals, 320)))
            
            checkField(calldataload(add(_pubSignals, 352)))
            
            checkField(calldataload(add(_pubSignals, 384)))
            
            checkField(calldataload(add(_pubSignals, 416)))
            
            checkField(calldataload(add(_pubSignals, 448)))
            
            checkField(calldataload(add(_pubSignals, 480)))
            

            // Validate all evaluations
            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            mstore(0, isValid)
             return(0, 0x20)
         }
     }
 }
