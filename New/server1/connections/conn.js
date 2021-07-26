const contract = require('truffle-contract');
const ganache = require('ganache-cli');
const HdWalletProvider = require('@truffle/hdwallet-provider');
const user_artifact= require('../../ethereuem/build/contracts/AdminUser.json');
const user= contract(user_artifact);
const Web3 = require('web3');
const web3= new Web3(Web3.providers.HttpProvider("http://localhost:8545"))



module.exports={
    web3: new Web3(Web3.providers.HttpProvider("http://localhost:8545")),
    start: function(currentAcount,callback){
        var self = this;
        self.currentAcount = self.web3.eth.getAccounts();
        user.setProvider(self.web3.currentProvider);
    
        var count;
        user.deployed().then(function(instance) {
          count = instance;
          return count.authorizeCaller(currentAcount[1], {from:currentAcount[0]});
        }).then(function(currentAcount) {
            
            console.log(currentAcount)
        }).catch(function(e) {
            console.log(e);
            callback("Error 404");
        });
    }
}