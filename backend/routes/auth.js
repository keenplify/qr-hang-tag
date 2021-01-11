const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router();

router.get('/login', (req, res) => {
    res.send("login")
})

module.exports = router