const store = require('./store');
const jwt = require('jsonwebtoken');

const auth = wallet => {
    return new Promise( async (resolve, reject) => {
        try {
          
            if(!wallet) throw 'Wallet no valida';  
            
            const getWallet = await getUser(wallet);
            const config = await store.getConfig();
            const banksAdmin = await store.getBanksAdmin();
            const banksUser = await store.getBanksUser(wallet);

            if(getWallet){

                //crear token 
                const dataUser = jwt.sign({
                    getWallet
                }, process.env.DATA_TOKEN, { expiresIn: '24h' });

                resolve({
                    message: "Auth succes",
                    token: dataUser,
                    _id: getWallet.user._id,
                    name: getWallet.user.name,
                    email:getWallet.user.email,
                    phone: getWallet.user.phone,
                    config,
                    banksAdmin,
                    banksUser
                }); 
                return;
            }
           
            const user = await store.addData();
            const newUser = await addWallet(wallet, user._id);
            //crear token 
            const dataUser = jwt.sign({
                newUser
            }, process.env.DATA_TOKEN, { expiresIn: '24h' });
     
            resolve({ 
                message: "successfully added",  
                token: dataUser,
                _id: user._id,
                name: user.name,
                email:user.email,
                phone: user.phone,
                config,
                banksAdmin,
                banksUser
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

            const decoded = await jwt.verify(token, process.env.DATA_TOKEN);
            const wallet = await store.get(decoded.data.wallet.toLowerCase());

            if(!wallet) throw 'user not found';
        
            resolve(false);
                  

        } catch (error) {
            reject(error);
        }
    });
}

const addWallet = async (wallet, user) => await store.add(wallet, user);
const getUser = async (wallet) => await store.get(wallet);

module.exports = {
    auth,
    verify
}