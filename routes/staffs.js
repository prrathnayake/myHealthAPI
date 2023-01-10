const express = require("express");
const { con } = require("../database/myDatabase");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const router = express.Router();

router.route("/addStaff").post(async (req, res) => {
  const { firstName, lastName, area, role, mobile, email } = req.body;
  const defaultPassword = (firstName + "123");
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO staffs ( roleID, firstName, lastName, area, mobile, email, rate, password) VALUES (?, ? ,? ,? ,? ,?,?,?)",
      [
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
              pass: "ndchajrwuzsbgfip",
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
              res.send("error");
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
