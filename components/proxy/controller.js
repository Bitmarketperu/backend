const fetch = require('node-fetch');

const get = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const query = await fetch('https://ewforex.net/app/divisas');

            const data = await query.json();
            resolve(data);

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
};

module.exports = {
    get
}