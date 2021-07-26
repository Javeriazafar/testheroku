const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    host: 'localhost',
    database:'blockchaindb' ,
    
});
require('mysql-queries').init(db);
db.connect((err)=>{
    if(err)
    console.log(err.message);
});

module.exports= db;

