const AdminUser = artifacts.require("AdminUser");
const fs =require('fs')
const path= require('path')
module.exports = function (deployer) {
  deployer.deploy(AdminUser,{from:"0x53fe80034dB699cb19663e8a7d9ABaB1e64E7f0C"}).then(() => {
    fs.writeFile(
      __dirname + path,
      'const ADDRESS = ' + "'" + AdminUser.address + "';",
      (err) => {
        if (err) {
          console.log(err)
        } else {
        }
      },
    )
    fs.appendFile(
      __dirname + path,
      '\nconst ABI = ' + JSON.stringify(AdminUser.abi) + ';',
      (err) => {
        if (err) {
          console.log(err)
        } else {
          fs.appendFile(
            __dirname + path,
            '\nmodule.exports = { ADDRESS, ABI };',
            (err) => {
              if (err) {
                console.log(err)
              }
            },
          )
        }
      },
    )
  })
};
