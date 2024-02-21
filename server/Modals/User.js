const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    loggedInTime: {
        type: Date,
    },
    loggedOutTime: {
        type: Date,
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
