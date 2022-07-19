const Model = require('./model');
const ModelUser = require('../user/model');

const getUser = async wallet => await Model.findOne({ wallet }).exec();
const addUser = (wallet, user) => Model.create({wallet, user});
const addDataUser = () =>  ModelUser().save();
// const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})
// const setUser = (wallets, user) => Model.findOneAndUpdate({ wallet }, user, { new: true})

module.exports = {
    get: getUser,
    add: addUser,
    addData: addDataUser
    // update: updateUser,
    // set: setUser
}