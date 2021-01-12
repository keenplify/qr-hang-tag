const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let User = require('../models/user.model')

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
    .then(user => {
        if (user == null) res.send("User not found")
        else bcrypt.compare(req.body.password, user.password, function(err, result) {
            res.send(result)
        })
    })
})

router.post('/register', (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        gender: req.body.gender
    })

    newUser.save()
    .then(() => res.send('User added!'))
    .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router