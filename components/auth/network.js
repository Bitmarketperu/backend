const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', async (req, res) => {
    const {wallet} = req.body;
    try {
        if(!wallet) throw "Wallet invalida";
        const responseController = await controller.auth(wallet.toLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.get('/:wallet', async (req, res) => {
    const {wallet} = req.params;
    try {
        if(!wallet) throw "Wallet invalida";
        const responseController = await controller.getUser(wallet.toLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.get('/verify/:token', async (req, res) => {
    const {token} = req.params;
    try {
        if(!token) throw "Token invalid";
        const responseController = await controller.verify(token);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;