const store = require('./store');
const ID_ADMIN_LEVEL = 1;

const getAll = (level) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            //verify authorization
            if(level != ID_ADMIN_LEVEL) throw 'No authorization';

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
            reject(error);
        }        
    })
};

const setUser = (wallet, _id, name, email, phone, userToken) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            if(userToken._id != _id) throw "User not authorization";
            const getUser = await store.get(wallet.toLowerCase());
            if(!getUser) throw "User not found";

            const user = {
                name : name,
                email: email,
                phone: phone
            }

            const setUser = await store.set(_id, user);
     
            resolve({ 
                message: "successfully update",  
                user: setUser
            });

        } catch (error) {
            reject(error);
        }        
    })
};

const setUserKyc = (idUser, kyc, userToken) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(userToken.level != ID_ADMIN_LEVEL) throw "User not authorization";
            const getUser = await store.getUserId(idUser);
            if(!getUser) throw "User not found";

            const user = { kyc }

            const setUser = await store.set(idUser, user);
     
            resolve({ 
                message: "successfully update",  
                user: setUser
            });

        } catch (error) {
            reject(error);
        }        
    })
};

module.exports = {
    setUser,
    getAll,
    setUserKyc
}