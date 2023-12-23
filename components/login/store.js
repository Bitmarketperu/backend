// const Model = require('./model');
const ModelUser = require('../user/model');
// const ModelConfig = require('../config/model');
const ModelBank = require('../bank/model');

const getUser = async email => await ModelUser.findOne({ email }).exec();
const getFromDniUser = async dni => await ModelUser.findOne({ dni }).exec();
const addUser = (email, password, name, dni, phone) => ModelUser.create({email, password, name, dni, phone});
const getUserAdmin = () => ModelUser.findOne({ level: 1 });    
// const addDataUser = () =>  ModelUser().save();
// const getConfig = () => ModelConfig.find({}, 'dolOut dolInp solOut solInp maxSol maxDol maxCrypto limSol limDol sellBit buyBit');
const getBanksAdmin = async (_id) => await ModelBank.find({ user: _id, status: 0 });
// const getBanksAdmin = () => ModelBank.find({ wallet: ('0x0daaE1BD303Ab2091e130c6d33C6a02e5aD0A9D2').toLowerCase()});
// const getBanksUser = (wallet) => ModelBank.find({ wallet });
// const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})
// const setUser = (wallets, user) => Model.findOneAndUpdate({ wallet }, user, { new: true})

module.exports = {
    get: getUser,
    add: addUser,
    getFromDni: getFromDniUser,
    getBanksAdmin,
    getUserAdmin
    // addData: addDataUser,
    // getConfig,
    // getBanksUser
    // update: updateUser,
    // set: setUser
}