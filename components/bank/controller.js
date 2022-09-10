const store = require('./store');

const getBank = ( wallet, walletToken ) => {
    return new Promise( async (resolve, reject) => {
        try {

            if(wallet.toLowerCase() != walletToken.toLowerCase()) throw "user no authorization";
            const banks = await store.getBank(wallet.toLowerCase());
     
            resolve(banks);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

const addBank = ( wallet, name, titular, number, type, money, walletToken ) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            if(walletToken.toLowerCase() != wallet.toLowerCase()) throw "User no authorization";
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

const setBank = ( wallet, walletToken, idBank ) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(walletToken.toLowerCase() != wallet.toLowerCase()) throw "User no authorization";
            await store.setBank(idBank);
     
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