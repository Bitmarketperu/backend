const express = require('express');
const home = require('../components/home/network');


const routerApi = app => {
    const route = express.Router();
    app.use('/api/v1/', route);
    route.use('/home', home);
    
}

module.exports = routerApi;