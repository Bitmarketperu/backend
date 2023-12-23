const store = require('./store');
const ID_ADMIN_LEVEL = 1;
const schema =  require('../../middlewares/validateUser');

const getAll = (level) => {

    return new Promise( async (resolve, reject) => {
        try {
            
            //verify authorization
            if(level != ID_ADMIN_LEVEL) throw 'No authorization';

            const users = await store.getAllUser();
            /* const dataUser = users.map( u => {
                return {
                    wallet: u.wallet,
                    _id: u.user._id,
                    name: u.user.name,
                    email: u.user.email,
                    phone: u.user.phone,
                    dni: u.user.dni,
                    level: u.user.level,
                    kyc: u.user.kyc
                }
            }) */
            resolve(users);

        } catch (error) {
            reject(error);
        }        
    })
};

const setUser = (wallet, _id, name, email, phone, dni, kyc, userToken) => {
    return new Promise( async (resolve, reject) => {
        try {
            const {error} = schema.validate({name, email, phone, dni}); 
            if (error) throw "Error en los datos del formulario", error;
            
            const getUser = await store.get(dni);
            console.log("user: ",getUser," DNI: ",dni)
            if(!getUser) throw "User not found";

            if(getUser.name !== '' && getUser.email !== '' ){
                if(userToken.level != ID_ADMIN_LEVEL){
                    if(userToken.user != _id) throw "User not authorization";
                }
            }
           

            const user = {
                name : name,
                email: email,
                phone: phone,
                dni: dni
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