const Model = require('./model');
const ModelUser = require('../user/model');

const addBank = bank => Model(bank).save();
const getUser = dni => ModelUser.findOne({ dni }).exec();
const getBank = user => Model.find({ user, status: 0 }).exec();
const setBank = _id => Model.findOneAndUpdate({ _id }, { status: 1 }, { new: true})
// const addUser = (user) => await Model.create({dni});
// const setUser = (dni, user) => Model.findOneAndUpdate({ dni }, user, { new: true});

module.exports = {
    add: addBank,
    get: getUser,
    getBank,
    setBank
    // add: addUser,
    // update: updateUser,
    // set: setUser
}