const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/").get(async (req, res) => {
    const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT firebaseUID FROM staffs WHERE staffID = ?",[parseInt(id)], (error, results) => {
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

module.exports = router;
