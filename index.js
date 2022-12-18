const express = require("express");
const doctors = require("./routes/api/doctors.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/doctors', doctors);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000, () => {
    console.groupCollapsed('Listening in port 3000...');
})