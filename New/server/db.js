const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'marsql',
    database: 'user1'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(5000,()=>{
    console.log("your server is running")
    });



//get all employees
app.get('/users', (req, res) => {
    mysqlConnection.query("SELECT * FROM details", (err, rows,fields) => {
        if (!err)
           res.send(rows);
        else
            console.log(err);
    });
});

    //get a employee
    app.get('/users/:id', (req, res) => {
        mysqlConnection.query("SELECT * FROM details WHERE id=?",[req.params.id], (err, rows,fields) => {    
            if (!err)
               res.send(rows);
            else
                console.log(err);
        });
});

//update an employee
app.put('/update',(req,res)=>{
    const  id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const city=req.body.city;
    const gender=req.body.gender;
    const department=req.body.department;
    mysqlConnection.query("UPDATE details SET name=?,email=?,phone=?,city=?,gender=?,department=? WHERE id=?",
    [name,email,phone,city,gender,department,id],(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result);
     }
    }); 
 });


//delete an employee
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM details WHERE id=?",[req.params.id], (err, rows,fields) => {
        
        if (!err)
           res.send('Deleted Succesfully');
        else
            console.log(err);
    });
});


//insert an employee
app.post("/create",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const city=req.body.city;
    const gender=req.body.gender;
    const department=req.body.department;


    mysqlConnection.query('INSERT INTO details(name,email,phone,city,gender,department) VALUES (?,?,?,?,?,?)',
    [name,email,phone,city,gender,department],
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send("Values inserted");
        }
    });
});




