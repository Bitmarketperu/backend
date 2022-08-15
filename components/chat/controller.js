const store = require('./store');
const socket = require('../../socket').socket;

const get = async (idTransaction) => {
    return new Promise( async (resolve, reject) => {
        try {
            const chat = await store.getChat(idTransaction);
            //websocket
            socket.io.emit('chat', chat);   

            resolve(chat);
        } catch (error) {
            reject(error);
        }
    })
}

const save = async (idTransaction, description, idUser) => {
    return new Promise( async (resolve, reject) => {
        try {

            await store.chatSave({idTransaction, description, idUser});

            const chat = await store.getChat(idTransaction);
            //websocket
            socket.io.emit('chat', chat);   

            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    get,
    save
}