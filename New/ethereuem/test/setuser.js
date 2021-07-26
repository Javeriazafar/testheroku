const AdminUser = require('../contracts/AdminUserartufact copy');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const{abi,bytecode}= AdminUser;
const ganache = require('ganache-cli');
const assert = require('assert');
const truffleAssert = require('truffle-assertions')
var Contract = require('web3-eth-contract');
const Web3= require('web3');
const { before } = require('mocha');
const web3= new Web3(ganache.provider());

let accounts;
// let factory;
// let campaignaddress;
 let campaign;
let contract;
let user_contract;
let acc1;
let owner;
// beforeEach (async ()=>{
//     accounts = await new web3.eth.getAccounts();
//    console.log('attempting to deploy from', accounts[0]);
  
//   factory = await new web3.eth.Contract(Registration.abi)
//      .deploy({data: Registration.bytecode})
//     .send({from: accounts[0], gas: '1000000' });

   
   
   

// })

// describe('Campaigns', ()=>{
//   // console.log(JSON.parse(compiledCampaign.metadata).output.abi )
  
//     it('start to end testing ',async()=>{
       
// //console.log(web3.eth.getBalance(accounts[1]).then(console.log));
//         let balance= await web3.eth.getBalance(accounts[1]);
//         console.log(balance);
//         balance= web3.utils.fromWei(balance.toString(), 'ether');
//         console.log(balance);
//         balance= parseFloat(balance);
//        console.log(balance);

//         assert(balance>103);

//     })
// });

before("contract", async () => {
    
   // console.log(contract.address)
    accounts = await new web3.eth.getAccounts();
    user_contract = new web3.eth.Contract(
        JSON.parse(abi),
         '0x796D553883BC23Cc823257F9aE61835C4cdE48B1' );
         
        // console.log(user_contract);
    
})

describe('contract',()=>{
    it('should register a new user', async () => {

        let balance= await web3.eth.getBalance(accounts[1]);
        
        assert.ok(user_contract._address);
    })
    it('create item',async()=>{
        acc1= accounts[1];
            campaign= await user_contract.methods.authorizeCaller(accounts[2]).send({
                from: accounts[1], gas:'1000000'
            })
            console.log(accounts[1])
            
    })
    it('owner',async ()=>{
        campaign = await user_contract.methods.setUser('0xF23648620a401070C38086dAa0B1D02696F9f6A5','javeria','9238932582','jajzaE#r3','location',4)
        .send({
            from: accounts[1], gas:'1000000'
        }).then(reciept=>{console.log(reciept.events.LogNewUser.returnValues[4])});
        console.log(campaign.events.LogNewUser.returnValues[4])
            assert.strictEqual(campaign.events.length, 1, "Should have emitted an event");
            
          const logger= await  user_contract.getPastEvents('LogNewUser', {
                fromBlock: 0,
                toBlock:'latest'

            });
            console.log(logger)

            var subscription = web3.eth.subscribe('logs', {address:accounts[1],topics:[]},function(error, result){
               
                if (!error)
                    console.log(result);
            })
            .on("data", function(transaction){
                console.log(transaction);
            });
            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
            });
        // const tx='0xe862b9774a0a70569d9fdc082ffc6c787a16650ded4c6c5562acf73fd2838030';
//   const receipt =  await web3.eth.getTransactionReceipt(tx);
        
//         console.log(receipt)
    const log= await  user_contract.events.LogNewUser().processLogs()
      console.log(log);

        
       
        
    })
})
