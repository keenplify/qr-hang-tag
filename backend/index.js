const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB Connected!")
}); 

const app = express();

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);
 
app.listen(5000, () => {
    console.log("Listening at port 5000")
});