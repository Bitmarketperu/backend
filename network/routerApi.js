const express = require('express');
const home = require('../components/home/network');
const auth = require('../components/auth/network');
const login = require('../components/login/network');
const user = require('../components/user/network');
const bank = require('../components/bank/network');
const transactions = require('../components/transactions/network');
const notification = require('../components/notification/network');
const config = require('../components/config/network');
const chat = require('../components/chat/network');
const proxy = require('../components/proxy/network');
const email = require('../components/email/network');


const routerApi = app => {
    const route = express.Router();
    app.use('/api/v1/', route);
    route.use('/home', home);
    route.use('/auth', auth);
    route.use('/login', login);
    route.use('/user', user);
    route.use('/bank', bank);
    route.use('/transactions', transactions);
    route.use('/notification', notification);
    route.use('/config', config);
    route.use('/chat', chat);
    route.use('/proxy', proxy);
    route.use('/email',email);
}

module.exports = routerApi;