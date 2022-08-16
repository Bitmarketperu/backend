const store = require('./store');

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
const addTransaction = ( wallet, id, bank, bankAdmin, amountSend, amountReceive, moneySend, moneyReceive, network, status ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const transaction = await store.add( {wallet, id, bank, bankAdmin, amountSend, amountReceive, moneySend, moneyReceive, network, status} );
     
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
    addTransaction,
    setTransaction,
    getALLTransaction
}