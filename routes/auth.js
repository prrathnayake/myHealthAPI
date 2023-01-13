const express = require("express");
const { con } = require("../database/myDatabase");
const { generateAccessToken, verfyUser } = require("../resourses/JWTtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM staffs WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.log(error);
          res.json("Somthing Wrong Please contact admin");
        } else if (results.length == 0) {
          console.log("Wrong Email!!!!!!");
          res.json("Wrong Email!");
        } else {
          let spword = results[0].password;
          bcrypt.compare(password, spword, function (err, isMatch) {
            if (err) {
              console.log(err);
            } else if (!isMatch) {
              res.json("Password doesn't match!");
            } else {
              const user = {
                id: results[0].staffID,
                email: results[0].email,
                role: results[0].roleID,
              };
              const accessToken = generateAccessToken(user);
              res.json({
                accessToken: accessToken,
                role: results[0].roleID,
                id: results[0].staffID,
                authentcated: true,
              });
            }
          });
        }
      }
    );
  });
});

router.post("/validateToken", verfyUser, (req, res) => {
  res.json("authenticated");
});

router.post("/getRole", verfyUser, (req, res) => {
  const id = req.body.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT roleID FROM staffs WHERE staffID = ?",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.json("Somthing Wrong Please contact admin");

          res.json({ role: 0 });
        } else {
          res.json({
            role: results[0].roleID,
          });
        }
      }
    );
  });
});

// router.post('/register', async (req, res) => {
//   console.log(req.body);

//     const{ fname, lname, address, mobile, email, pword, pwordConfirm} = req.body;

//     con.query("SELECT email FROM staffs WHERE email = ?", [email], async (error, results) => {
//         if(error){
//             console.log(error)
//         }

//         if(results.length > 0){
//             return res.render("register", {
//                 message: "That Email is already in use!!!"
//             })
//         } else if(pword !== pwordConfirm){
//             return res.render("register", {
//                 message: "Password don't match!!!"
//             })
//         }

//         let hashedPassword = await bcrypt.hash(pword, 10);
//         console.log(hashedPassword);

//         con.query("INSERT INTO staffs SET ?", {sf_name: fname, sl_name:lname, s_address:address, mobile:mobile, email:email, pword:hashedPassword}, (error,results) => {
//             if(error){
//                 console.log("error:",error)
//             } else{
//                 console.log(results)
//                 return res.render("register", {
//                 message: "User Registered!!!"
//                 })
//             }
//         })

//     })
// })

module.exports = router;
