const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const cors = require('cors');



const bcrypt=require('bcrypt');
const saltRounds=10;


app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key:"user_id",
    secret:"texchain",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60*60*24,
    },
})
);

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'marsql',
    database: 'blockchaindb'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3001,()=>{
    console.log("your server is running")
    });



//get all users
app.get('/users', (req, res) => {
    mysqlConnection.query("SELECT * FROM user", (err, rows,fields) => {
        if (!err)
           res.send(rows);
        else
            console.log(err);
    });
});

    //get a user
    app.get('/users/:id', (req, res) => {
        mysqlConnection.query("SELECT * FROM user WHERE id=?",[req.params.id], (err, rows,fields) => {    
            if (!err)
               res.send(rows);
            else
                console.log(err);
        });
});

//update a user
app.put('/update',(req,res)=>{
    const  user_id=req.body.user_id;
    const user_name=req.body.user_name;
    const password=req.body.password;
    const role_id=req.body.role_id;
    const account_address=req.body.account_address;
    const email=req.body.email;
    const location=req.body.location;
    mysqlConnection.query("UPDATE user SET user_name=?,password=?,role_id=?,account_address=?,email=?,location=? WHERE user_id=?",
    [user_name,password,role_id,account_address,email,location,user_id],(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result);
     }
    }); 
 });


//delete a user
app.delete('/users/:user_id', (req, res) => {
    mysqlConnection.query("DELETE FROM user WHERE user_id=?",[req.params.user_id], (err, rows,fields) => {
        
        if (!err)
           res.send('Deleted Succesfully');
        else
            console.log(err);
    });
});


//insert a user
app.post("/create",(req,res)=>{
    const user_name=req.body.user_name;
    const password=req.body.password;
    const role_id=req.body.role_id;
    const account_address=req.body.account_address;
    const email=req.body.email;
    const location=req.body.location;


    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err){
            console.log(err)
        }
        mysqlConnection.query('INSERT INTO user(user_name,password,role_id,account_address,email,location) VALUES (?,?,?,?,?,?)',
    [user_name,hash,role_id,account_address,email,location],
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send("Values inserted");
        }
    }) 
    });   
});

app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true,user:req.session.user})
    }else{
        res.send({loggedIn:false})
    }
})

app.post("/login",(req,res)=>{
    const user_name=req.body.user_name;
    const password=req.body.password;

    mysqlConnection.query('SELECT * FROM user WHERE user_name=?;',
    user_name,
    (err,result)=>{
        if(err){
            res.send({err:err});
        } 
        if(result.length>0){
            bcrypt.compare(password,result[0].password,(error,response)=>{
                if(response){
                    req.session.user=result;
                    console.log(req.session.user);
                    res.send(result)
                }else{
                    res.send({message: "Wrong User Name or Password!"})
                }
            })
        } else{
            res.send({message: "User doesn't exists!"})
        }
    });

    
});