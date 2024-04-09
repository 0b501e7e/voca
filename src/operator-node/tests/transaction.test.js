const { submitTransaction } = require('../src/controllers/transactionController');
const stateManager = require('../src/services/stateTree');
const { eddsa, poseidon } = require('circomlibjs');

jest.mock('../src/services/stateManager');

const generateSignature = (transaction) => {
    const msgHash = poseidon([
        BigInt(transaction.from.x),
        BigInt(transaction.from.y),
        BigInt(transaction.to.x),
        BigInt(transaction.to.y),
        BigInt(transaction.amount),
        BigInt(transaction.nonce),
    ]);
    const privateKey = Buffer.from('1'.repeat(64), 'hex');

    const signature = eddsa.signPoseidon(privateKey, msgHash);
    return {
        R8x: signature.R8[0].toString(),
        R8y: signature.R8[1].toString(),
        S: signature.S.toString(),
    };
};

describe('Transaction Submission', () => {
    beforeEach(() => {
        stateManager.getAccount.mockReset();
        stateManager.addAccount.mockReset();
        stateManager.updateAccount.mockReset();
    });

    it('should process a valid transaction updating account balances', async () => {
        const senderPublicKey = eddsa.prv2pub(Buffer.from('1'.repeat(64), 'hex'));
        console.log("senderPublicKey: ", senderPublicKey);
        const receiverPublicKey = eddsa.prv2pub(Buffer.from('2'.repeat(64), 'hex'));
        const amount = 50;
        const nonce = 0;
        const tokenType = 1;

        stateManager.getAccount.mockImplementation(pubKey => {
            const accountKey = `${pubKey.x}${pubKey.y}`;
                return { balance: 100, nonce: 0, token_type: 1 };
        });
        
        const transaction = {
            from: {x: senderPublicKey[0].toString(), y: senderPublicKey[1].toString()},
            to: {x: receiverPublicKey[0].toString(), y: receiverPublicKey[1].toString()},
            from_index: 0,
            nonce: nonce + 1,
            amount,
            token_type: tokenType,
        };
        console.log("transaction: ", transaction);
        const signature = generateSignature(transaction);

        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        // Execute the submitTransaction function
        const res = mockResponse();
        await submitTransaction({ body: { ...transaction, signature } }, res);

        // Validate response
        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Transaction successfully processed',
            transaction: expect.objectContaining({
                from: transaction.from,
                to: transaction.to,
                amount: transaction.amount,
                nonce: transaction.nonce,
                token_type: transaction.token_type,
            })
        }));

        expect(stateManager.updateAccount).toHaveBeenCalledTimes(2); // Updates for both sender and receiver
    });
});
