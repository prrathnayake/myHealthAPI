const express = require("express");
const { con } = require("../database/myDatabase");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { verfyUser } = require("../resourses/JWTtoken");
const { db } = require("../firebase/firebase.js");

const router = express.Router();

router.route("/addStaff").post(verfyUser, async (req, res) => {
  const { firstName, lastName, area, role, mobile, email } = req.body;
  const defaultPassword = firstName + "123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);

  const response = await  db.collection("doctors").add({
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    email: email,
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO staffs ( firebaseUID, roleID, firstName, lastName, areaID, mobile, email, rate, password) VALUES (?, ?, ? ,? ,? ,? ,?,?,?)",
      [
        response.id,
        parseInt(role),
        firstName,
        lastName,
        parseInt(area),
        mobile,
        email,
        0.0,
        hashedPassword,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([]);
        } else {
          const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "pasan.webtesting@gmail.com",
              pass: "hohrhkvtakzwbfjm",
            },
          });

          const mailOptions = {
            from: "pasan.webtesting@gmail.com",
            to: email,
            subject: "Account successfully created",
            text: `Your password: ${defaultPassword}`,
          };

          transpoter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("email sent...");
            }
          });

          res.json(results);
        }
      }
    );
  });
});

module.exports = router;
