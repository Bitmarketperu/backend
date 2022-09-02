const store = require('./store');

//GET CONFIG
const getConfig = () => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const config = await store.get();
            resolve(config);
            
        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//SET CONFIG
const setConfig = ( dolOut, dolInp, solOut, solInp, maxSol, maxDol, maxCrypto, limSol, limDol, bitToPen, bitToUsd, usdToBit, penToBit ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const config = await store.set( {dolOut, dolInp, solOut, solInp, maxSol, maxDol, maxCrypto, limSol, limDol, penToBit, bitToPen, usdToBit, bitToUsd} );
     
            resolve({ 
                message: "successfully update",  
                config
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

module.exports = {
    getConfig,
    setConfig
}