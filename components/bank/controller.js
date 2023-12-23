const store = require('./store');
const schema =  require('../../middlewares/validateBank');

// const getBank = ( dni, dniToken ) => {
const getBank = ( user  ) => {
    return new Promise( async (resolve, reject) => {
        try {
           /*  console.log('DNI:',dni)
            console.log('DNITOKEN:',dniToken) */

            // if(dni!= dniToken) throw "user no authorization";
            const banks = await store.getBank(user);
            
            resolve(banks);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

const addBank = ( dni, name, titular, number, type, money, dniToken, user ) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(dniToken != dni) {
                throw "User no authorization";
            }

            const getUser = await store.get(dni);
            if(!getUser) throw "User not found";

            const {error} = schema.validate({titular, number}); 
            if (error) throw "Error en los datos del formulario";

            const newBank = await store.add( {dni, name, titular, number, type, money, user} );
     
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

const setBank = ( dni, dniToken, idBank ) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(dniToken != dni) throw "User no authorization";
            await store.setBank(idBank)
     
            resolve("Successfully Delete")

        } catch (error) {
            console.log(error)
            reject(error)
        }        
    })
};

module.exports = {
    addBank,
    getBank,
    setBank
}