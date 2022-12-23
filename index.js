const express = require("express");
const doctors = require("./routes/doctors.js");
const patients = require("./routes/patients.js");
const hospitals = require("./routes/hospitals.js");
const schedules = require("./routes/schedules.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/doctors', doctors);
app.use('/patients', patients);
app.use('/hospitals', hospitals);
app.use('/schedules', schedules);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3001, () => {
    console.groupCollapsed('Listening in port 3001...');
})