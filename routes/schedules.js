const express = require("express");
const { con } = require("../database/myDatabase");

const router = express.Router();

router.route("/").get(async (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM schedules sc LEFT JOIN staffs do on sc.staffID = do.staffID",
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
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
      "SELECT * FROM schedules sc LEFT JOIN staffs do on sc.staffID = do.staffID LEFT JOIN patients p on sc.patientID = p.patientID WHERE scheduleID = ? ",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/staffID").get(async (req, res) => {
  const id = req.query.id;
  const date = req.query.date;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM schedules sc RIGHT JOIN staffs do on sc.staffID = do.staffID WHERE staffID = ? AND appointmentDate = ?",
      [id, date],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
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
      "SELECT * FROM patients p LEFT JOIN schedules sc on p.patientID = sc.patientID LEFT JOIN staffs do  on sc.staffID = do.staffID LEFT JOIN doctorArea da on do.roleID = da.areaID WHERE p.firebaseUID  = ? AND sc.scheduleID IS NOT NULL AND sc.appointmentDate > DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY sc.appointmentDate ASC",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/doctorid").get(async (req, res) => {
  const id = req.query.id;
  const date = req.query.date;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM schedules sc LEFT JOIN patients p on sc.patientID = p.patientID WHERE sc.staffID = ? AND CAST(sc.appointmentDate AS DATE) = ? ORDER BY sc.appointmentDate ASC",
      [parseInt(id), date],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
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
      "INSERT INTO schedules (staffID, patientID, hospitalID, scheduledDate, updateDate, appointmentDate, startTime, endTime, description, status) VALUES ( ?,(SELECT patientID FROM patients Where firebaseUID = ?),?,?,?,?,?,?,?,?)",
      [
        parseInt(req.body["staffID"]),
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
          res.json([])
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/update").post(async (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "UPDATE schedules SET staffID = ? , hospitalID = ? , updateDate = ?, appointmentDate = ?, startTime = ?, endTime = ?, description = ?, status = ? WHERE scheduleID = ?",
      [
        parseInt(req.body["staffID"]),
        parseInt(req.body["hospitalID"]),
        req.body["dateNow"],
        req.body["date"],
        req.body["startTime"],
        req.body["endTime"],
        req.body["description"],
        "Pending",
        parseInt(req.body["scheduleID"]),
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
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
      "UPDATE schedules SET status='Cancled' WHERE scheduleID = ?",
      [parseInt(id)],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
        } else {
          res.json(results);
        }
      }
    );
  });
});

router.route("/confirm").post(async (req, res) => {
  const id = req.query.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "UPDATE schedules SET status='Confirm' WHERE scheduleID = ?",
      [parseInt(id)],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length == 0) {
          res.json([])
        } else {
          res.json(results);
        }
      }
    );
  });
});
module.exports = router;
