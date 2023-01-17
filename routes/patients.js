const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/").get(async (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM patients", (error, results) => {
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

router.route("/id").get(async (req, res) => {
  const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM patients WHERE patientID = ?",
      [id],
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

router.route("/doctorId").get(async (req, res) => {
  const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM patients p RIGHT JOIN schedules sc on p.patientID = sc.patientID WHERE sc.staffID = ? GROUP BY(p.patientID)",
      [parseInt(id)],
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

router.route("/patientIDs").get(async (req, res) => {
  const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT p.patientID, p.firstName, p.lastName FROM patients p RIGHT JOIN schedules sc on p.patientID = sc.patientID WHERE sc.staffID = ? GROUP BY(p.patientID)",
      [parseInt(id)],
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

router.route("/add").post(async (req, res) => {
  const { firstName, lastName, uid, nic, mobile, email, username } = req.body;

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO patients ( firebaseUID, firstName, lastName, mobile, email, nic, username) VALUES (?, ?, ? ,? ,? ,? ,?)",
      [uid, firstName, lastName, mobile, email, nic, username],
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
