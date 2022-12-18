const express = require('express');

const router = express.Router();

router.route('/')
.get((req, res) => {
    res.send('Doctors');
})

module.exports = router;