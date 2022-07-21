const Model = require('./model');
const ModelAuth = require('../auth/model');

const getUser = wallet => Model.findOne({ wallet }).exec();
const getAllUser = wallet => ModelAuth.find().populate('user').exec();
// const addUser = (user) => await Model.create({wallet});
// const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})
const setUser = (wallet, user) => Model.findOneAndUpdate({ wallet }, user, { new: true});

module.exports = {
    set: setUser,
    get: getUser,
    getAllUser
    // add: addUser,
    // update: updateUser,
    // set: setUser
}