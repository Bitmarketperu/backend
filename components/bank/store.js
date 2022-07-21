const Model = require('./model');
const ModelUser = require('../user/model');

const addBank = bank => Model(bank).save();
const getUser = wallet => ModelUser.findOne({ wallet }).exec();
const getBank = wallet => Model.find({ wallet, status: 0 }).exec();
const setBank = _id => Model.findOneAndUpdate({ _id }, { status: 1 }, { new: true})
// const addUser = (user) => await Model.create({wallet});
// const setUser = (wallet, user) => Model.findOneAndUpdate({ wallet }, user, { new: true});

module.exports = {
    add: addBank,
    get: getUser,
    getBank,
    setBank
    // add: addUser,
    // update: updateUser,
    // set: setUser
}