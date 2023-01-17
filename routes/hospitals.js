const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/").get(async(req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query('SELECT * FROM hospitals',  (error, results) => {
        if(error){
            console.log(error)
        }
        else if(results.length == 0){
            res.json([])
        }else{
            res.json(results)
        }          
      
    });
  });
});
router.route("/top").get(async(req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query('SELECT * FROM hospitals ORDER BY rate DESC LIMIT 10',  (error, results) => {
        if(error){
            console.log(error)
        }
        else if(results.length == 0){
            res.json([])
        }else{
            res.json(results)
        }          
      
    });
  });
});

router.route("/id").get(async(req, res) => {
    const  id  = req.query.id
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM hospitals WHERE hospitalID = ?', [id],  (error, results) => {
            if(error){
                console.log(error)
            }
            else if(results.length == 0){
                res.json([])
            }else{
                res.json(results)
            }          
          
        });
      });
});

router.route("/dropdown").get(async(req, res) => {
    con.connect(function (err) {
      if (err) throw err;
      con.query('SELECT hospitalID, name FROM hospitals',  (error, results) => {
          if(error){
              console.log(error)
          }
          else if(results.length == 0){
            res.json([])
          }else{
              res.json(results)
          }          
        
      });
    });
});

router.route("/addHospital").post(async (req, res) => {
    const { name, address, mobile } = req.body;
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO hospitals ( name, address, mobile, rate) VALUES (?, ? ,?, ? )",
        [name, address,  mobile, 0.0],
        (error, results) => {
          if (error) {
            console.log(error);
          } else if (results.length == 0) {
            res.json([]);
          } else {
            res.json(results);
          }
        }
      );
    });
  });
  
  module.exports = router;