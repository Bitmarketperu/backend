const Model = require('./model');
const ModelUser = require('../user/model');
const ModelConfig = require('../config/model');
const ModelBank = require('../bank/model');

const getUser = async wallet => await Model.findOne({ wallet }).populate('user').exec();
const addUser = (wallet, user) => Model.create({wallet, user});
const addDataUser = () =>  ModelUser().save();
const getConfig = () => ModelConfig.find({}, 'dolOut dolInp solOut solInp maxSol maxDol maxCrypto limSol limDol');
// const getBanksAdmin = () => ModelBank.find({ _id: '62da154ed123c718901415ee'});
const getBanksAdmin = () => ModelBank.find({ _id: '62da154ed123c718901415ee'});
// const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})
// const setUser = (wallets, user) => Model.findOneAndUpdate({ wallet }, user, { new: true})

module.exports = {
    get: getUser,
    add: addUser,
    addData: addDataUser,
    getConfig,
    getBanksAdmin
    // update: updateUser,
    // set: setUser
}