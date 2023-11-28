const Model = require('./model');
/* const ModelAuth = require('../auth/model'); */

const getUser = dni => Model.findOne({ dni }).exec();
const getUserId = idUser => Model.findOne({ _id: idUser }).exec();
const getAllUser = () => Model.find().exec()
// const addUser = (user) => await Model.create({wallet});
// const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})
const setUser = (_id, user) => Model.findOneAndUpdate({ _id }, user, { new: true});

module.exports = {
    set: setUser,
    get: getUser,
    getAllUser,
    getUserId,
    // add: addUser,
    // update: updateUser,
    // set: setUser
}