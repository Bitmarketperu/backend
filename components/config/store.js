const Model = require('./model');

const getConfig = () => Model.findOne().exec();
const setConfig = (data) => Model.findOneAndUpdate({}, data, { new: true});

module.exports = {
    get: getConfig,
    set: setConfig,
}