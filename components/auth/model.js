const mongoose = require('mongoose');

const { Schema } = mongoose;

const Wallet = new Schema({
    wallet: {
        type: String,
        required: true,
        unique: true
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('wallet', Wallet);