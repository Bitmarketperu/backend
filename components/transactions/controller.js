const store = require('./store');

//GET ALL TRANSLATIONS USER
const getUserTransaction = ( wallet, desde, hasta ) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log(wallet, desde, hasta)
            desde = desde + "T00:00:00.000+00:00";
            hasta = hasta + "T23:59:59.000+00:00";
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

            desde = desde + "T00:00:00.000+00:00";
            hasta = hasta + "T23:59:59.000+00:00";
            const transactions = await store.getAll(desde, hasta);
     
            resolve(transactions);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//ADD TRANSLATIONS USER
const addTransaction = ( wallet, id, amountSend, amountReceive, moneySend, moneyReceive, network ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const transaction = await store.add( {wallet, id, amountSend, amountReceive, moneySend, moneyReceive, network} );
     
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
const setTransaction = ( transationId ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const transaction = await store.set(transationId);
     
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