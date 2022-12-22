const express = require('express');

const router = express.Router();

router.route('/')
.get((req, res) => {
    res.send('Doctors');
})

router.route('/:id')
.get((req, res) => {
    res.send('Doctors ID');
})

module.exports = router;