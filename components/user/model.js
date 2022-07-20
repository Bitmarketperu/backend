const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        default: ""
    },
    level: {
        type: Number,
        default: 0
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('User', User);