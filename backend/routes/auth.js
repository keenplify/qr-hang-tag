const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

let User = require('../models/user.model')

router.post('/login', (req, res) => {
    User.findOne(
        {$or: [
            {username: req.body.username},
            {email: req.body.username}
        ]}
    )
    .then(user => {
        if (user == null) res.send("User not found! Please try again.")
        else bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (result) res.json({
                passed: true,
                _id: user._id,
                type: user.type,
                token: user.token
            }) 
            else {
                res.send('Invalid login credentials! Please try again.')
            }
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
    .catch(err => console.log(err))
})


router.post('/walletbalance', passport.authenticate('bearer', { session: false }), (req, res) => {
    res.send({
        discountValueWallet: req.user.discountValueWallet,
        discountPercentageWallet: req.user.discountPercentageWallet
    })
})

router.post('/verifytoken',  passport.authenticate('bearer', { session: false }), (req, res) => {
    res.json('Token verified')
})

module.exports = router