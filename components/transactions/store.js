const Model = require('./model');

const addtransaction = transaction => Model(transaction).save();
const getTransactionLates = () => Model.find({moneySend : "Tether", moneyReceive : "Soles" }).populate('bank').sort({ date: -1}).limit(10);

const getUserTransaction = (wallet, desde, hasta) => Model.find({ wallet, date: {"$gte": desde, "$lt": hasta} }).populate('bank').populate('bankAdmin');

const getAllTransactions = (desde, hasta) => Model.find({date: {"$gte": desde, "$lt": hasta}}).populate('bank').populate('bankAdmin');

const setTransaction = (_id, status) => Model.findOneAndUpdate({ _id }, { status }, { new: true})

module.exports = {
    add: addtransaction,
    getLates: getTransactionLates,
    set: setTransaction,
    getAllUser: getUserTransaction,
    getAll: getAllTransactions
}