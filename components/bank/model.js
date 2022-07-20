const mongoose = require('mongoose');

const { Schema } = mongoose;

const Bank = new Schema({
    wallet: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    titular: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    money: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Bank', Bank);