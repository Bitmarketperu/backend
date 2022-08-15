const Model = require('./model');

const chatSave = (data) => Model(data).save();

const getChat = async (idTransaction) => Model.find({ idTransaction }).populate('idUser');

module.exports = {
    chatSave,
    getChat
}