const mongoose = require('mongoose');

const { Schema } = mongoose;

const Transactions = new Schema({
    dni:{
        type:Number,
        required:true
    },
    wallet: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    payMethod: {
        type: Object,
        required: true,
    },
    reciveUser: {
        type: String,
    },
    reciveNetwork: {
        type: String,
    },
    reciveMethod: {
        type: String,
    },
    bank: {
        type: Schema.ObjectId,
        ref: 'Bank',
    },
    bankAdmin: {
        type: Schema.ObjectId,
        ref: 'Bank',
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
        require: true
    },
    origen: { 
        type: String,
        Default: ''
    },
    politico: { 
        type: String,
        Default: ''
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Transactions', Transactions);