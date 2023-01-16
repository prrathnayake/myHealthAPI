const express = require("express");
const cors = require("cors");
const PythonShell = require("python-shell").PythonShell;
const doctors = require("./routes/doctors.js");
const patients = require("./routes/patients.js");
const hospitals = require("./routes/hospitals.js");
const schedules = require("./routes/schedules.js");
const auth = require("./routes/auth.js");
const role = require("./routes/role.js");
const area = require("./routes/area.js");
const staffs = require("./routes/staffs.js");
const availableTime = require("./routes/availableTime.js");
const chat = require("./routes/chat.js");
const firebase = require("./routes/firebase.js");

const app = express();

app.use(cors({
  origin: "http:/172.105.58.35:3000"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/doctors", doctors);
app.use("/patients", patients);
app.use("/hospitals", hospitals);
app.use("/schedules", schedules);
app.use("/auth", auth);
app.use("/role", role);
app.use("/area", area);
app.use("/staffs", staffs);
app.use("/addAvailableTime", availableTime);
app.use("/chat", chat);
app.use("/firebase", firebase);

app.get("/", (req, res) => {
  const symptoms = req.query.symptoms;
  try {
    var options = {
      scriptPath: "./python",
      args: [symptoms],
    };

    PythonShell.run("main.py", options, function (err, results) {
      if (err) throw err;
      // Results is an array consisting of messages collected during execution
      res.json(results);
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.groupCollapsed("Listening in port 3001...");
});
