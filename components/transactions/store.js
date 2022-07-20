const Model = require('./model');

const addtransaction = transaction => Model(transaction).save();
const getTransaction = _id => Model.find({ _id }).exec();

const getUserTransaction = (wallet, desde, hasta) => Model.find({ wallet, date: {"$gte": desde, "$lt": hasta} }).exec();

const getAllTransactions = (desde, hasta) => Model.find({date: {"$gte": desde, "$lt": hasta}}).exec();

const setTransaction = _id => Model.findOneAndUpdate({ _id }, { status: 1}, { new: true})

module.exports = {
    add: addtransaction,
    get: getTransaction,
    set: setTransaction,
    getAllUser: getUserTransaction,
    getAll: getAllTransactions
}