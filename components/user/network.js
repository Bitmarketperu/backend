const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.put('/', async (req, res) => {
    const { wallet, name, email, phone } = req.body;
    try {
        if(!wallet) throw "Wallet invalidssa";
        const responseController = await controller.setUser(wallet, name, email, phone);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;