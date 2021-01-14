const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose')
const cors = require('cors');
const BearerStrategy = require('passport-http-bearer');

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

let User = require('./models/user.model');

passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

const authRouter = require('./routes/auth');
const hangtagsRouter = require('./routes/hangtags');

app.use('/auth', authRouter);
app.use('/hangtags', hangtagsRouter);
 
app.listen(5000, () => {
    console.log("Listening at port 5000")
});