const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: String,
    birthdate: Date,

    email: {
        type: String,
        match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    city: String,
    country: String,
    image: String,
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, config.server.bcrypt.rounds);
    }
    next();
});

userSchema.method({
    checkPassword: function (plaintextPassword) {
        return bcrypt.compareSync(plaintextPassword, this.password);
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;