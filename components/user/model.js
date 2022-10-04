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
        type: String,
        default: ""
    },
    dni: {
        type: Number,
        default: "",
    },
    level: {
        type: Number,
        default: 0
    },
    kyc: {
        type: Boolean,
        default: false
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('User', User);