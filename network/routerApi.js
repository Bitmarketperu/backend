const express = require('express');
const home = require('../components/home/network');
const auth = require('../components/auth/network');


const routerApi = app => {
    const route = express.Router();
    app.use('/api/v1/', route);
    route.use('/home', home);
    route.use('/auth', auth);
    
}

module.exports = routerApi;