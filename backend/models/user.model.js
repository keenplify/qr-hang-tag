const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    type: {
        type: String,
        default: 'member'
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    //GENERATE SALT & BCRPYT PASSWORD
    bcrypt.genSalt(8)
    .then(salt => {
        bcrypt.hash(this.password, salt)
        .then(hash => {
            this.password = hash;
            this.token = crypto.randomBytes(64).toString('hex')
            next();
        })
    })
});

const User = mongoose.model('User', userSchema)

module.exports = User