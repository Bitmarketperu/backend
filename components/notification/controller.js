const store = require('./store');

//GET NOTIFICATIONS USER
const getNotification = ( wallet ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const notification = await store.get(wallet);
     
            resolve(notification);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//GET ALL NOTIFICATIONS FOR ADMIN
const getAllNotifications = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const notification = await store.getAllNotifications();
     
            resolve(notification);

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

//ADD NOTIFICATIONS
const addNotification = ( wallet, title, description ) => {
    return new Promise( async (resolve, reject) => {
        try {

            const notification = await store.add( {wallet, title, description} );
     
            resolve({ 
                message: "successfully added",  
                notification
            });

        } catch (error) {
            console.log(error)
            reject(error);
        }        
    })
};

module.exports = {
    addNotification,
    getAllNotifications,
    getNotification
}