const express = require('express');
const home = require('../components/home/network');
const auth = require('../components/auth/network');
const user = require('../components/user/network');
const bank = require('../components/bank/network');


const routerApi = app => {
    const route = express.Router();
    app.use('/api/v1/', route);
    route.use('/home', home);
    route.use('/auth', auth);
    route.use('/user', user);
    route.use('/bank', bank);
}

module.exports = routerApi;