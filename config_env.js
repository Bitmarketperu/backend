module.exports = process.env.NODE_ENV === 'production' 
            ? require('dotenv').config({ path: '.env.production' }) 
            : require('dotenv').config({ path: '.env.development' });
