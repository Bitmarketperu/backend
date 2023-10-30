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
        type:String,
        require:true
    },
    
    phone:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Wallet', Wallet);