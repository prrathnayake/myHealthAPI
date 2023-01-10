const express = require("express");
const { con } = require("../database/myDatabase");
const dayjs = require('dayjs')

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { doctorID, hospitalID, stName, dayOfWeek, startTime, endTime } = req.body;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "INSERT INTO availableTime ( staffID, hospitalID, setDate, updateDate, dayOfWeek, startTime, endTime) VALUES (?, ? ,? ,? ,? ,?, ?)",
      [
        parseInt(doctorID),
        parseInt(hospitalID),
        dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
        dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss'),
        dayOfWeek,
        startTime,
        endTime,
      ],
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
