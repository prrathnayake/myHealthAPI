const express = require("express");
const PythonShell = require("python-shell").PythonShell;
const doctors = require("./routes/doctors.js");
const patients = require("./routes/patients.js");
const hospitals = require("./routes/hospitals.js");
const schedules = require("./routes/schedules.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/doctors", doctors);
app.use("/patients", patients);
app.use("/hospitals", hospitals);
app.use("/schedules", schedules);

app.get("/", (req, res) => {
  const symptons = req.query.symptons;

  var options = {
    scriptPath: "./python",
    args: [symptons],
  };

  PythonShell.run("main.py", options, function (err, results) {
    if (err) throw err;
    // Results is an array consisting of messages collected during execution
    res.json(results);
  });
});

app.listen(3001, () => {
  console.groupCollapsed("Listening in port 3001...");
});
