const express = require("express");
const { con } = require("../daatabase/myDatabase");

const router = express.Router();

router.route("/").get(async (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM schedules sc LEFT JOIN doctors do on sc.doctorID = do.doctorID",
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          console.log("no details!!");
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/id").get(async (req, res) => {
  const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM schedules sc LEFT JOIN doctors do on sc.doctorID = do.doctorID WHERE scheduleID = ?",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.send("no details!!");
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/userid").get(async (req, res) => {
  const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM patients p LEFT JOIN schedules sc on p.patientID = sc.patientID LEFT JOIN doctors do  on sc.doctorID = do.doctorID  WHERE p.firebaseUID  = ? AND sc.scheduleID IS NOT NULL",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json("no details!!");
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/add").post(async (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO schedules (doctorID, patientID, hospitalID, scheduledDate, updateDate, appointmentDate, startTime, endTime, description, status) VALUES ( ?,(SELECT patientID FROM patients Where firebaseUID = ?),?,?,?,?,?,?,?,?)",
      [
        parseInt(req.body["doctorID"]),
        req.body["patientUid"],
        parseInt(req.body["hospitalID"]),
        req.body["dateNow"],
        req.body["dateNow"],
        req.body["date"],
        req.body["startTime"],
        req.body["endTime"],
        req.body["description"],
        "Pending",
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json("no details!!");
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/cancle").post(async (req, res) => {
    const id = req.query.id;
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        "UPDATE schedules SET status='Cancle' WHERE scheduleID = ?",[parseInt(id)],
        (error, results) => {
          if (error) {
            console.log(error);
          } else if (results.length == 0) {
            console.log("no details!!");
          } else {
            res.json(results);
          }
        }
      );
    });
  });

module.exports = router;
