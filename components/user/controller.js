const store = require('./store');

const getAll = () => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const users = await store.getAllUser();
            const dataUser = users.map( u => {
                return {
                    wallet: u.wallet,
                    _id: u.user._id,
                    name: u.user.name,
                    email: u.user.email,
                    phone: u.user.phone,
                    level: u.user.level
                }
            })
            resolve(dataUser);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

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
    setUser,
    getAll
}