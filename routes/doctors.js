const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/").get(async(req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query('SELECT * FROM staffs WHERE roleID = 2',  (error, results) => {
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
      con.query('SELECT *, da.discription as area FROM staffs s LEFT JOIN doctorArea da ON s.areaID = da.areaID WHERE roleID = 2 ORDER BY rate DESC LIMIT 10',  (error, results) => {
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
        con.query('SELECT *, da.discription as area FROM staffs s LEFT JOIN doctorArea da ON s.areaID = da.areaID WHERE staffID = ?', [id],  (error, results) => {
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
    con.query('SELECT staffID, firstName, lastName FROM staffs',  (error, results) => {
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

router.route("/availableTime").get(async(req, res) => {
    const  {doctorID, hospitalID}  = req.query
    con.connect(function (err) {
      if (err) throw err;
      con.query('SELECT * FROM availableTime WHERE staffID = ? AND hospitalID = ?',[doctorID, hospitalID],  (error, results) => {
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

  router.route("/addStaff").post(async(req, res) => {
    const  {staffID, hospitalID}  = req.query
    con.connect(function (err) {
      if (err) throw err;
      con.query('SELECT * FROM availableTime WHERE staffID = ? AND hospitalID = ?',[staffID, hospitalID],  (error, results) => {
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

module.exports = router;