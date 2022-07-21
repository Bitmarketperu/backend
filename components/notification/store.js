const Model = require('./model');

const addNotification = (Notification) => Model(Notification).save();
const getNotificationUser = wallet => Model.find({ wallet }).exec();
const getAllNotifications = () => Model.find().exec();

module.exports = {
    add: addNotification,
    get: getNotificationUser,
    getAllNotifications
}