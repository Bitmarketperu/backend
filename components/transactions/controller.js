const store = require('./store');
const socket = require('../../socket').socket;

//GET ALL TRANSLATIONS USER
const getUserTransaction = ( wallet, desde, hasta ) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            desde = desde + "T05:00:00.000+00:00";
            hasta = hasta + "T04:59:59.000+00:00";

            const transactions = await store.getAllUser(wallet, desde, hasta); 
       
            resolve(transactions);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};
//GET TRANSLATIONS WITH ID
const getTransactionId = ( wallet, idTransaction) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const transaction = await store.get(idTransaction);
            //websocket
            socket.io.emit('transaction', transaction);    
            resolve(true);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//GET ALL TRANSLATIONS USERS FOR ADMIN
const getALLTransaction = ( desde, hasta ) => {
    return new Promise( async (resolve, reject) => {
        try {

            desde = desde + "T05:00:00.000+00:00";
            hasta = hasta + "T04:59:59.000+00:00";
            const transactions = await store.getAll(desde, hasta);
     
            resolve(transactions);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//ADD TRANSLATIONS USER
const addTransaction = ( wallet, id, payMethod, bank, bankAdmin, amountSend, amountReceive, moneySend, moneyReceive, network, status ) => {
    return new Promise( async (resolve, reject) => {
        try {

            let time = new Date();
            let date = String(time.getFullYear()) + "-" + String(time.getMonth() + 1).padStart(2, '0') + "-" + String(time.getDate()).padStart(2, '0') + "T" + String(time.getHours()) + ":" + String(time.getMinutes()).padStart(2, '0');
            const transaction = await store.add( {wallet, id, payMethod, bank, bankAdmin, amountSend, amountReceive, moneySend, moneyReceive, network, status, date} );
            
            resolve({ 
                message: "successfully added",  
                transaction
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//SET TRANSLATIONS USER
const setTransaction = ( transationId, status ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const transaction = await store.set(transationId, status);
            
            //websocket
            socket.io.emit('transaction', transaction);   
     
            resolve({
                message: "Successfully Update",
                transaction
            })

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

module.exports = {
    getUserTransaction,
    getTransactionId,
    addTransaction,
    setTransaction,
    getALLTransaction
}