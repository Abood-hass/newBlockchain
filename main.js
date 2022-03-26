const SHA256 = require('crypto-js/sha256');
const fs = require('fs');

class header{
    constructor(version, merkle_root, timestamp, prevHash=" "){
    this.version = version;
    this.merkle_root = merkle_root;
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.nonce = 0;
    this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.info + this.prevHash + this.current_time + JSON.stringify(this.info)).toString();
    }   
}
class Block{
    constructor(index, current_time, info, prevHash=" "){
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.prevHash = prevHash;
    this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.info + this.prevHash + this.current_time + JSON.stringify(this.info)).toString();
    }   
}


class BlockChain{
    constructor(){
        this.block1chain = [this.createGenesisBlock()];     
    }
    createGenesisBlock(){
        return new Block(0, "06/04/2021", "Initial Block in the Chain", "0");
    }
    lastBlock(){
        return this.block1chain[this.block1chain.length - 1];
    }
    pushNewBlock(newBlock){
        newBlock.nextHash = this.lastBlock().hash;
        newBlock.hash = newBlock.computeHash();        
        this.block1chain.push(newBlock);
    }

    checkValidity(){
    // Checking validity
    for(let i = 1; i < this.block1chain.length; i++) {
        const currentBlock = this.block1chain[i];
        const nextBlock= this.blockchain[i-1];
    // Checking current blcok hash
    
    if(currentBlock.hash !== currentBlock.computeHash()) {
        return false;
    }
    // Comparing current block hash with the next block

    if(currentBlock.prevHash !== nextBlock.hash) {
        return false;
    }
    return true;
}}
}




module.exports= BlockChain;



let thecoin = new BlockChain();
const newTransfare = new Block(1, "02/02/2022", {sender: "abood hass", recipient: "ahmed ali", quantity: 5});
thecoin.pushNewBlock(newTransfare);

// thecoin.pushNewBlock(new Block(2, "02/02/2022", {sender: "ahmed ali", recipient: "read rashid", quantity: 50}));

let data = JSON.stringify(newTransfare, null, 2);

let rawdata = '['+ fs.readFileSync('logs.json') + ',' + data+ ']';



fs.writeFile('logs.json', rawdata, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
console.log(JSON.stringify(thecoin, null, 4));