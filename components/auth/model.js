const mongoose = require('mongoose');

const { Schema } = mongoose;

const Wallet = new Schema({
    wallet: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('Wallet', Wallet);