const store = require('./store');

const setUser = (wallet, name, email, phone) => {
    return new Promise( async (resolve, reject) => {
        try {
          
            if(!wallet) throw 'Wallet no valida';  
            
            const getUser = await store.get(wallet);
            if(!getUser) throw "User not found";

            const user = {
                name : name,
                email: email,
                phone: phone
            }

            const setUser = await store.set(wallet, user);
     
            resolve({ 
                message: "successfully update",  
                user: setUser
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

module.exports = {
    setUser
}