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
                    level: u.user.level,
                    kyc: u.user.kyc
                }
            })
            resolve(dataUser);

        } catch (error) {
            reject(error);
        }        
    })
};

const setUser = (wallet, _id, name, email, phone, kyc, userToken) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            if(userToken.level != ID_ADMIN_LEVEL){
                if(userToken._id != _id) throw "User not authorization";
            }
            
            const getUser = await store.get(wallet.toLowerCase());
            if(!getUser) throw "User not found";

            const user = {
                name : name,
                email: email,
                phone: phone
            }

            if(kyc != 'undefined') user.kyc = kyc;
        
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

module.exports = {
    setUser,
    getAll
}