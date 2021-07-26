require('dotenv').config();
const express= require('express');
const fileUpload = require('express-fileupload');
const db = require('./db');
const cors= require('cors');
const UserService = require('./services/services');
const router = require('./routes/user.routes');
const router1=require('./routes/item.routes');
const app= express();
app.use(express.static('upload'));
app.use(cors());
// default option
app.use(fileUpload());

app.use(express.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS")
  next();
});

const port = 5000 || process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user',router);
//app.use('/supplier',require('./routes/item.routes'));
// module.exports = class User{

//   static async apiGetAllUsers(req, res, next){
//       try {
//         const Users = await UserService.getAllUsers();
//         if(!Users){
//            res.status(404).json("There are no User published yet!")
//         }
//         res.json(Users);
//       } catch (error) {
//          res.status(500).json({error: error})
//       }

//   }
// }


// app.get('/user/:id',(req,res)=>{
//     db.query('select * from user where user_id=?',[req.params.id], (err, result)=>{
//         if(err)
//         {
//             console.log(err)
//         }
//         res.send(result);
//     })
// });

// app.post('/create', (req, res) => {
//     const user_name = req.body.user_name;
//     const password = req.body.password;
//     const role_id = req.body.role_id;
//     const account_address =req.body.account_address;
//     const email =req.body.email;
//     const location =req.body.location;

    
  // console.log(req.body)
  //   db.query(
  //     "INSERT INTO user (user_name,password,role_id,account_address,email,location) VALUES (?,?,?,?,?,?)",
  //     [user_name, password, role_id, account_address,email,location],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(req.body);
  //       }
  //     }
  //   );

  // });

// app.put("/updatemanufacturer",(req,res)=>{

//     const role_id = req.body.role_id;
//     const user_id=req.body.user_id;

//   db.query(
//     "UPDATE user SET role_id = ? WHERE user_id = ?",
//     [role_id,user_id],
//   (error,result)=>{
//     if(error){
//       console.log(error.message)
//     }
//     else{
//       res.send(result)
//     }
//   });

// });


// app.delete("/delete/:user_id", (req,res)=>{
//   const user_id= req.params.user_id;

//   db.query('DELETE FROM user WHERE user_id = ?',user_id,(error,result)=>{
//     if(error)
//     console.log(error)
//     else
//     res.send('deleted!')
//   })
// })


app.listen(5000, ()=> {

 

   console.log(`server is running on : ${port}`)

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
 });