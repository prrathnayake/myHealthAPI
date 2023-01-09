const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/addStaff").post(async (req, res) => {
  const { firstName, lastName, area, role, mobile, email } = req.body;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO staffs ( roleID, firstName, lastName, area, mobile, email) VALUES (?, ? ,? ,? ,? ,?)",
      [parseInt(role), firstName, lastName, parseInt(area), mobile, email],
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
