const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress,toAddress,amount,) {

        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

const pino = require('pino')
const logger = pino({
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            levelFirst: true,
            colorize: true
        }
    }
})

class Block {
    constructor(timestamp, transactions, previusHash = '') {

        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previusHash = previusHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previusHash + JSON.stringify(this.transaction) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.hash = this.calculateHash()
            this.nonce++;
        }

        logger.info("Block mined: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock];
        this.difficulty = 2;
        this.pedingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {

        let block = new Block(date.now(), this.pedingTransactions);
        block.mineBlock(this.difficulty);

        // aqui
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previusHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}


let item = new Blockchain();

