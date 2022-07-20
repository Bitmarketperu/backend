const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet) throw "data invalida";
        const responseController = await controller.getBank( wallet );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.post('/', async (req, res) => {
    const { wallet, name, titular, number, type, money } = req.body;
    try {
        if(!wallet, !name, !titular, !number, !type, !money) throw "data invalida";
        const responseController = await controller.addBank( wallet, name, titular, number, type, money );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.put('/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet) throw "data invalida";
        const responseController = await controller.setBank( wallet );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;