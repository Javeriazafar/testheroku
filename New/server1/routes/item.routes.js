const express = require("express");
const router = express.Router();
const app= express();
const db = require("../db");

router.route('/getsuppliersItems/:id').get((req, res) => {
    db.query("SELECT * FROM supplier_item WHERE user_id=?",[req.params.id], (err, rows,fields) => {    
        if (!err)
          res.send(rows);
          
        else
            console.log(err);
    });
});