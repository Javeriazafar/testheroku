import Web3 from 'web3';
import Provider from '@truffle/hdwallet-provider';
const supplychain = require('../contracts/Supplychain.json');
const admin =require('../contracts/AdminUser.json');


const infuraKey = 'wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931'

const supplychain_provider= new Provider('dd0771907b760c1cd6e19acc3bc51e7fe32d2661ab1fa7b4e52cef20cfc051f2',infuraKey);
const web3s =new Web3(supplychain_provider)

const account = web3s.eth.accounts.privateKeyToAccount(
    "dd0771907b760c1cd6e19acc3bc51e7fe32d2661ab1fa7b4e52cef20cfc051f2"
  );
  console.log(account.address)
  console.log(web3s.eth.getBalance("0x6829b48374596ada2b7cba811697454ed950c71e"))

 const supplychain_contract =  new web3s.eth.Contract(
    (supplychain.abi),'0xCf77731Cb0C5459a5237BEAF5Df65526BE2Ff12a');





export default(supplychain_contract);
