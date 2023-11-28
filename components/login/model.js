const mongoose = require('mongoose');

const { Schema } = mongoose;

const Wallet = new Schema({
    wallet: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
         default: Date.now 
    },
    name:{
        type:String,
        require:true
    },
    dni:{
        type:Number,
        require:true,
        unique: true
    },
    phone:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Wallet', Wallet);