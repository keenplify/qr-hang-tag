const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected")
});

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);
 
app.listen(5000);