const store = require('./store');
const socket = require('../../socket').socket;

//GET ALL TRANSLATIONS USER
const getUserTransaction = ( wallet, desde, hasta ) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            // desde = desde + "T05:00:00.000+00:00";
            // hasta = hasta + "T04:59:59.000+00:00";
            desde = desde + "T00:00:00";
            hasta = hasta + "T23:59:59";
            
            const transactions = await store.getAllUser(wallet, desde, hasta); 
       
            resolve(transactions);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};
//GET TRANSLATIONS 10 LATES
const getTransactionLates = () => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const transaction = await store.getLates();   
            resolve(transaction);

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

            // desde = desde + "T05:00:00.000+00:00";
            // hasta = hasta + "T04:59:59.000+00:00";
            desde = desde + "T00:00:00";
            hasta = hasta + "T23:59:59";
            const transactions = await store.getAll(desde, hasta);
     
            resolve(transactions);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//ADD TRANSLATIONS USER
const addTransaction = ( wallet, id, reciveUser, reciveNetwork, payMethod, reciveMethod, bank, bankAdmin, amountSend, amountReceive, moneySend, moneyReceive, network, status ) => {
    return new Promise( async (resolve, reject) => {
        try {

            let time = new Date();
            let date = String(time.getFullYear()) + "-" + String(time.getMonth() + 1).padStart(2, '0') + "-" + String(time.getDate()).padStart(2, '0') + "T" + String(time.getHours()).padStart(2, '0') + ":" + String(time.getMinutes()).padStart(2, '0');
            const transaction = await store.add( {wallet, id, reciveUser, payMethod, reciveMethod, reciveNetwork, bank, bankAdmin, amountSend, amountReceive, moneySend, moneyReceive, network, status, date} );
            
            let desde = String(time.getFullYear()) + "-" + String(time.getMonth() + 1).padStart(2, '0') + "-" + String(time.getDate()).padStart(2, '0') + "T00:00:00";
            let hasta = String(time.getFullYear()) + "-" + String(time.getMonth() + 1).padStart(2, '0') + "-" + String(time.getDate()).padStart(2, '0') + "T23:59:59";

            const transactions = await store.getAll(desde, hasta);
            //websocket
            socket.io.emit('transactions', transactions);  

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
    getTransactionLates,
    addTransaction,
    setTransaction,
    getALLTransaction
}