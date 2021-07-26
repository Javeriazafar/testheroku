const HdWalletProvider = require('@truffle/hdwallet-provider');
const Web3= require('web3');

const {abi, bytecode} = require('../build/contracts/AdminUser.json');


const provider= new HdWalletProvider(
    'card raw chuckle hidden chuckle fire mix word hotel nuclear you return',
    'https://rinkeby.infura.io/v3/10cfdc60e2c841e4b03a5adf4abae931'
);

const web3= new Web3(provider);

const deploy= async()=>{
    const accounts= await web3.eth.getAccounts();
    console.log('attempting to deploy from', accounts[0]);

    const example = await new web3.eth.Contract(abi)
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '1000000' });
    console.log(example.options.address);
    
    
    
    //console.log(JSON.parse(compileFactory.metadata).output.abi)

  
};
deploy();