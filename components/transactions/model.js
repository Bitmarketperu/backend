const mongoose = require('mongoose');

const { Schema } = mongoose;

const Transactions = new Schema({
    wallet: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    amountSend: {
        type: Number,
        required: true,
    },
    amountReceive: {
        type: Number,
        required: true,
    },
    moneySend: {
        type: String,
        required: true,
    },
    moneyReceive: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        require: true
    },
    date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Transactions', Transactions);