const Model = require('./model');

const addtransaction = transaction => Model(transaction).save();
const getTransaction = _id => Model.find({ _id }).populate('bank');

const getUserTransaction = (wallet, desde, hasta) => Model.find({ wallet, date: {"$gte": desde, "$lt": hasta} }).populate('bank').populate('bankAdmin');

const getAllTransactions = (desde, hasta) => Model.find({date: {"$gte": desde, "$lt": hasta}}).populate('bank').populate('bankAdmin');

const setTransaction = (_id, status) => Model.findOneAndUpdate({ _id }, { status }, { new: true})

module.exports = {
    add: addtransaction,
    get: getTransaction,
    set: setTransaction,
    getAllUser: getUserTransaction,
    getAll: getAllTransactions
}