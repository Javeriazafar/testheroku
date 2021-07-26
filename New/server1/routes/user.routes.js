const { Router } = require("express");
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
var sqlclient = require("mysql-queries");
const app = express();
const db = require("../db");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const multer = require("multer");

const upload = multer();
app.use(fileUpload());
// router.get("/getusers", Userctl.apiGetAllUsers);
router.route("/getall").get((req, res) => {
  db.query("select * from user", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.route("/getSSOSALESORDER").get((req, res) => {
  db.query("select * from supp_sales_order", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.route("/getMSO").get((req, res) => {
  db.query(
    "SELECT req_id, user_name, merchandizer, upc, descript, SOCreatedAt, quantity, status, orderpending FROM user inner join  manu_sales_order on user.user_id= manu_sales_order.user_id",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

router.route("/getallrequests").get((req, res) => {
  db.query(
    "select *  from user inner JOIN requestbymanufacturer ON user.user_id=requestbymanufacturer.user_id",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
router.route("/getmerchstock").get((req, res) => {
  db.query("select *  from manu_stock", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.route("/getallitems").get((req, res) => {
  db.query("select * from supplier_item", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.route("/getsalesorder").get((req, res) => {
  db.query("select * from sales_order", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.route("/getbrandreq").get((req, res) => {
  db.query("select *  from user inner JOIN requestbybrand ON user.user_id=requestbybrand.user_id", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
 
router.route('/createbrandorder',upload.single("file")).post((req,res)=>{
  const {
    file,
    body: { description ,user_id},
  } = req;

  console.log(req.files.file);
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(file);
  }

  // name of the input is sampleFile
  uploadPath = __dirname + "/../../public/uploadsamplefile/" + req.files.file.name;

  console.log(req.files.file);

  //Use mv() to place file on the server
  req.files.file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

 db.query('insert into requestbybrand(sample,description,user_id) values(?,?,?)',[req.files.file.name,description,user_id],(err,result)=>{
     if(err){
       console.log(err)
     }
     res.send(result)
 })
});
});


router.route("/createuser").post((req, res) => {
  const data = req.body;
  //console.log(req.body.us_name)
  const user_name = data.user_name;
  const password = data.password;
  const privatekey = data.privatekey;
  const role_id = data.role_id;
  const account_address = data.account_address;
  const email = data.email;
  const location = data.location;

  //console.log(req.body.user_name)
  db.query(
    "INSERT INTO user (user_name,password,role_id,privatekey,account_address,email,location) VALUES (?,?,?,?,?,?)",
    [
      user_name,
      password,
      privatekey,
      role_id,
      account_address,
      email,
      location,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(req.body);
      }
    }
  );
});

router.route("/getsuppliersItems/:id").get((req, res) => {
  db.query(
    "SELECT * FROM supplier_item WHERE user_id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

router.route("/getmanufacturerrequests/:id").get((req, res) => {
  db.query(
    "SELECT * FROM requestbymanufacturer WHERE suser_id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

router.route("/getmanufacturerrequests/:id").get((req, res) => {
  db.query(
    "SELECT * FROM requestbymanufacturer WHERE user_id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

router.route("/getallproducts").get((req, res) => {
  db.query("select * from product", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.route("/createitem", upload.single("file")).post((req, res) => {
  const {
    file,
    body: { upc, user_id, material, quantity, longitude, latitude, price },
  } = req;

  console.log(req.files.file);
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(file);
  }

  // name of the input is sampleFile
  uploadPath = __dirname + "/../../public/upload/" + req.files.file.name;

  console.log(req.files.file);

  //Use mv() to place file on the server
  req.files.file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    db.query(
      "INSERT INTO SUPPLIER_ITEM(user_id,material,quantity,upc,price,longitude,latitude,image) values(?,?,?,?,?,?,?,?)",
      [
        user_id,
        material,
        quantity,
        upc,
        price,
        longitude,
        latitude,
        req.files.file.name,
      ],
      (err, rows) => {
        if (!err) {
          res.send(req.body);
        } else {
          console.log(err);
        }
      }
    );
  });
  // db.query(
  //   "INSERT INTO SUPPLIER_ITEM(user_id,material,quantity,upc,price,longitude,latitude,createdAt) values(?,?,?,?,?,?,?,?)",
  //   [user_id, material, quantity, upc, price, longitutde, latitude, createdAt],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send(req.body);
  //     }
  //   }
  // );
});
router.route("/updateuser").put((req, res) => {
  const user_id = req.body.id;
  const account_address = req.body.account_address;
  const password = req.body.password;
  const location = req.body.location;
  db.query(
    "UPDATE user SET account_address=?,password=?,location=? WHERE user_id=?",
    [account_address, password, location, user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route("/acceptorder").get((req, res) => {
  const upc = req.query.upc;
  const new_quantity = req.query.quantity;
  const merchandizer = req.query.merchandizer;
  const descrip = req.query.description;
  const material = req.query.material;
  const muser_id = req.query.muser_id;//35
  const suser_id = 6;//dynamic
  const req_id = req.query.req_id;
  console.log(req.query.req_id);
  db.query(
    `call Accept_Manu_Order(?,?,?,?,?,?,?,?)`,
    [
      upc,
      new_quantity,
      merchandizer,
      material,
      descrip,
      suser_id,
      muser_id,
      req_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});



router.route("/acceptbrandorder").get((req, res) => {


  const sample = req.query.sample;
  const merchandizer = req.query.merchandizer;
  const productupc = req.query.productupc;
  
  const req_id = req.query.req_id;
  console.log(req.query.req_id);
  db.query(
    `call Accept_Brand_Order(?,?,?,?)`,
    [
      req_id,
      merchandizer,
      sample,
      productupc,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});



router.route("/createproduct").post((req, res) => {
  const rawitemupc = req.body.rawitemupc;
  const merch_id = req.body.merch_id;
  const employee_id = req.body.employee_id;
  const treatements = req.body.treatements;
  const productupc = req.body.productupc;
  const machine_id = req.body.machine_id;
  const createdAt = req.body.createdAt;
  const cost_sku = req.body.cost_sku;
  //const pattern=req.body.pattern;
  const quality_inspection = req.body.quality_inspection;
  const quantity = req.body.quantity;

  db.query(
    "INSERT INTO product(merch_id,employee_id,machine_id,createdAt,productupc,cost_sku,quality_inspection,rawitemupc,treatements,quantity) values(?,?,?,?,?,?,?,?,?,?)",
    [
      merch_id,
      employee_id,
      machine_id,
      createdAt,
      productupc,
      cost_sku,
      quality_inspection,
      rawitemupc,
      treatements,
      quantity,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(req.body);
      }
    }
  );
});

router.route("/createrequestmanu").post((req, res) => {
  const upc = req.body.upc;
  const merchandizer = req.body.merchandizer;
  const material = req.body.material;
  const description = req.body.description;
  const user_id = req.body.user_id;// manufacturer
  const quantity = req.body.quantity;
  const suser_id = req.body.Suser_id;// supplier


  db.query(
    "INSERT INTO requestbymanufacturer(quantity, upc, merchandizer, material, description, user_id,suser_id) values(?,?,?,?,?,?,?)",
    [quantity, upc, merchandizer, material, description, user_id,suser_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(req.body);
      }
    }
  );
});

router.route("/updateproduct").put((req, res) => {
  const cost_sku = req.body.cost_sku;
  const quantity = req.body.quantity;
  const product_id = req.body.product_id;
  db.query(
    "UPDATE product SET cost_sku=?,quantity=?WHERE product_id=?",
    [cost_sku, quantity, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route("/updatemanurequest").put((req, res) => {
  const quantity = req.body.quantity;
  const req_id = req.body.req_id;
  console.log(req.body.req_id);
  db.query("call updaterequest(?,?) ", [req_id, quantity], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
router.route("/updatebrandrequest").put((req, res) => {
  const merchandizer = req.body.merchandizer;
  const req_id = req.body.req_id;
  console.log(req.body.req_id);
  db.query("call updaterequest(?,?) ", [req_id, merchandizer], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
router.route("/getsuppliersItems").get((req, res) => {
  const user_id = req.body.user_id;
  db.query(
    "  select user.user_name,user.email, user.location, user.user_id, group_concat(supplier_item.upc separator ',') as Item_list  from user  JOIN supplier_item ON user.user_id = supplier_item.user_id group by user_id  ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route("/updateitem").put((req, res) => {
  const quantity = req.body.quantity;
  const price = req.body.price;
  const id = req.body.item_id;
  db.query(
    "UPDATE supplier_item SET quantity=?,price=?WHERE item_id=?",
    [quantity, price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
module.exports = router;
