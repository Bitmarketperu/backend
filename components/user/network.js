const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const responseController = await controller.getAll();
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//UPDATE USER
router.put('/', async (req, res) => {
    const { wallet, name, email, phone } = req.body;
    try {
        if(!wallet) throw "Wallet invalida";
        const responseController = await controller.setUser(wallet, name, email, phone);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;