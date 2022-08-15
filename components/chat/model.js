const mongoose = require('mongoose');

const { Schema } = mongoose;

const Chat = new Schema({
    idTransaction: {
        type: Schema.ObjectId,
        ref: 'Transactions'
    },
    idUser: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        required: true,
    },
    date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Chat', Chat);