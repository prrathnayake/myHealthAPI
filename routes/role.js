const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/").get(async (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM role", (error, results) => {
      if (error) {
        console.log(error);
      } else if (results.length == 0) {
        res.json([]);
      } else {
        res.json(results);
      }
    });
  });
});

router.route("/").post(async (req, res) => {
  const { role } = req.body;
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "INSERT INTO role ( discription) VALUES (?)",
        [role],
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
