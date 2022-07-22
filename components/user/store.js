const Model = require('./model');
const ModelAuth = require('../auth/model');

const getUser = wallet => ModelAuth.findOne({ wallet }).populate('user').exec();
const getAllUser = () => ModelAuth.find().populate('user').exec();
// const addUser = (user) => await Model.create({wallet});
// const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})
const setUser = (_id, user) => Model.findOneAndUpdate({ _id }, user, { new: true});

module.exports = {
    set: setUser,
    get: getUser,
    getAllUser
    // add: addUser,
    // update: updateUser,
    // set: setUser
}