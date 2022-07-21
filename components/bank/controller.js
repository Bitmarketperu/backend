const store = require('./store');

const getBank = ( wallet ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const banks = await store.getBank(wallet.toLowerCase());
     
            resolve(banks);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

const addBank = ( wallet, name, titular, number, type, money ) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const getUser = await store.get(wallet);
            if(!getUser) throw "User not found";

            const newBank = await store.add( {wallet, name, titular, number, type, money} );
     
            resolve({ 
                message: "successfully added",  
                bank: newBank
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

const setBank = ( wallet ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const banks = await store.setBank(wallet.toLowerCase());
     
            resolve("Successfully Delete");

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

module.exports = {
    addBank,
    getBank,
    setBank
}