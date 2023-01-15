const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/doctorPatientUIDs").get(async (req, res) => {
  const { patientID, doctorID } = req.query;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT p.firebaseUID AS patientUID, d.firebaseUID AS doctorUID FROM patients p, staffs d WHERE p.patientID = ? AND d.staffID = ?",
      [parseInt(patientID), parseInt(doctorID)],
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
