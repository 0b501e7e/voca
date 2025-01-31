const {stringifyBigInts} = require('./stringifybigint.js')

module.exports = function getCircuitInput(stateTransition){

    const currentState = stateTransition.originalState;
    const txTree = stateTransition.txTree;
    
    const depth = txTree.depth;

    const paths2txRoot = stateTransition.paths2txRoot
    const paths2txRootPos = stateTransition.paths2txRootPos
    const deltas = stateTransition.deltas

    var intermediateRoots = new Array(2 ** (depth + 1) + 1);
    var paths2rootFrom = new Array(2 ** depth);
    var paths2rootFromPos = new Array(2 ** depth);
    var paths2rootTo = new Array(2 ** depth);
    var paths2rootToPos = new Array(2 ** depth);

    var balanceFrom = new Array(2 ** depth);

    var balanceTo = new Array(2 ** depth);
    var nonceTo = new Array(2 ** depth);
    var tokenTypeTo = new Array(2 ** depth);

    intermediateRoots[0] = currentState;

    for (var i = 0 ; i < deltas.length; i ++){

        delta = deltas[i];

        intermediateRoots[2*i + 1] = delta.rootFromNewSender;

        paths2rootFrom[i] = delta.senderProof,
        paths2rootFromPos[i] = delta.senderProofPos,

        paths2rootTo[i] = delta.receiverProof,
        paths2rootToPos[i] = delta.receiverProofPos,

        intermediateRoots[2*i + 2] = delta.rootFromNewReceiver;

        balanceFrom[i] = delta.balanceFrom;
        
        balanceTo[i] = delta.balanceTo;
        nonceTo[i] = delta.nonceTo;
        tokenTypeTo[i] = delta.tokenTypeTo;

    }

    const txs = txTree.txs;
    var fromX = new Array(2 ** depth);
    var fromY = new Array(2 ** depth);
    var fromIndex = new Array(2 ** depth);
    var toX = new Array(2 ** depth);
    var toY = new Array(2 ** depth);
    var nonceFrom = new Array(2 ** depth);
    var amount = new Array(2 ** depth);
    var tokenTypeFrom = new Array(2 ** depth);
    var R8x = new Array(2 ** depth);
    var R8y = new Array(2 ** depth);
    var S = new Array(2 ** depth);

    for (var i = 0; i < txs.length; i++){
        
        const tx = txs[i];

        fromX[i] = tx.fromX;
        fromY[i] = tx.fromY;
        fromIndex[i] = tx.fromIndex;
        toX[i] = tx.toX;
        toY[i] = tx.toY;
        nonceFrom[i] = tx.nonce;
        amount[i] = tx.amount;
        tokenTypeFrom[i] = tx.tokenType;

        R8x[i] = tx.R8x;
        R8y[i] = tx.R8y;
        S[i] = tx.S;

    }
    
    return {
        txRoot: stringifyBigInts(txTree.root),
        txPathHashes: stringifyBigInts(paths2txRoot),
        txPathPositions: paths2txRootPos,
        currentState: stringifyBigInts(currentState),
        intermediateRoots: stringifyBigInts(intermediateRoots),
        senderBalancePathHashes: stringifyBigInts(paths2rootFrom),
        senderBalancePathPositions: paths2rootFromPos,
        receiverBalancePathHashes: stringifyBigInts(paths2rootTo),
        receiverBalancePathPositions: paths2rootToPos,
        from_x: stringifyBigInts(fromX),
        from_y: stringifyBigInts(fromY),
        from_index: fromIndex,
        to_x: stringifyBigInts(toX),
        to_y: stringifyBigInts(toY),
        senderNonce: nonceFrom,
        amount: amount,
        senderTokenType: tokenTypeFrom,
        R8x: stringifyBigInts(R8x),
        R8y: stringifyBigInts(R8y),
        S: stringifyBigInts(S),
        senderTokenBalance: balanceFrom,
        receiverTokenBalance: balanceTo,
        receiverNonce: nonceTo,
        receiverTokenType: tokenTypeTo
    }

}