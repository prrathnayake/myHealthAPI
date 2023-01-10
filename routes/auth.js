const express = require("express");
const { con } = require("../database/myDatabase");
const { generateAccessToken } = require("../resourses/JWTtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  con.connect(function(err) {
      if (err) throw err;
      con.query('SELECT password FROM staffs WHERE email = ?', [email], (error, results) => {
          if(error){
              console.log(error)
          }
          else if(results.length == 0){
              console.log("Wrong Email!!!!!!")
              res.json('Wrong Email!')
          }else{
              let spword = results[0].password
              bcrypt.compare(password, spword, function(err, isMatch) {
                  if (err) {
                  console.log (err);
                  } 
                  else if (!isMatch) {
                      console.log("Password doesn't match!")
                      res.json('Password doesn\'t match!')
                  } 
                  else {
                      console.log("Password matches!")
                      const user = { 
                          id:results[0].staffID,
                          email:results[0].email ,
                          role:results[0].roleID  
                      }
                      const accessToken = generateAccessToken(user)
                      res.json({accessToken: accessToken, role: results[0].s_role, authentcated: true})

                  }
              })
          }          
      })
  });
})

router.post('/register', async (req, res) => {
  console.log(req.body);

    const{ fname, lname, address, mobile, email, pword, pwordConfirm} = req.body;
    
    con.query("SELECT email FROM staffs WHERE email = ?", [email], async (error, results) => {
        if(error){
            console.log(error)
        }

        if(results.length > 0){
            return res.render("register", {
                message: "That Email is already in use!!!"
            })
        } else if(pword !== pwordConfirm){
            return res.render("register", {
                message: "Password don't match!!!"
            })
        } 

        let hashedPassword = await bcrypt.hash(pword, 10);
        console.log(hashedPassword);

        con.query("INSERT INTO staffs SET ?", {sf_name: fname, sl_name:lname, s_address:address, mobile:mobile, email:email, pword:hashedPassword}, (error,results) => {
            if(error){
                console.log("error:",error)
            } else{
                console.log(results)
                return res.render("register", {
                message: "User Registered!!!"
                })
            }
        })

    })
})

module.exports = router;