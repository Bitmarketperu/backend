const store = require('./store');
const jwt = require('jsonwebtoken');

const auth = wallet => {
    return new Promise( async (resolve, reject) => {
        try {
          
            if(!wallet) throw 'Wallet no valida';  
            
            const getWallet = await getUser(wallet);
            
            if(getWallet){

                //crear token 
                const dataUser = jwt.sign({
                    getWallet
                }, process.env.DATA_TOKEN, { expiresIn: '24h' });

                resolve({
                    message: "Auth succes",
                    token: dataUser
                }); 
                return;
            }
           
            const newUser = await addWallet(wallet);

            //crear token 
            const dataUser = jwt.sign({
                newUser
            }, process.env.DATA_TOKEN, { expiresIn: '24h' });
     
            resolve({ 
                message: "successfully added", 
                token: dataUser
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

const verify = (token) => {
    return new Promise( async (resolve, reject) => {
        try {

            const decoded = await jwt.verify(token, 'secret');
            const wallet = await store.get(decoded.data.name.toLowerCase());

            if(!user) throw 'El usuario no existe';  

            if(passCompare){
                resolve({
                id: user.id,
                level: user.level,
                saldo: user.saldo,
                pay: user.pay
                });
            }else{
                resolve(false);
            }            

        } catch (error) {
            reject(error);
        }
    });
}

const addWallet = async (wallet) => await store.add(wallet);
const getUser = async (wallet) => await store.get(wallet);

module.exports = {
    auth,
    verify
}