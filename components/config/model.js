const mongoose = require('mongoose');

const { Schema } = mongoose;

const Config = new Schema({
    dolOut: {
        type: Number,
        required: true
    },
    dolInp: {
        type: Number,
        required: true
    },
    solOut: {
        type: Number,
        required: true
    },
    solInp: {
        type: Number,
        required: true
    },
    maxSol: {
        type: Number,
        required: true
    },
    maxDol: {
        type: Number,
        required: true
    },
    maxCrypto: {
        type: Number,
        required: true
    },
    limSol: {
        type: Number,
        required: true
    },
    limDol: {
        type: Number,
        required: true
    },
    date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Config', Config);