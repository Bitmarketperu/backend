const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//GET ALL TRANSLATIONS USER
router.get('/:wallet/:desde/:hasta', async (req, res) => {
    const { wallet, desde, hasta } = req.params;
    try {
        if(!wallet || !desde || !hasta) throw "data invalida";
        const responseController = await controller.getUserTransaction( wallet, desde, hasta );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//GET ALL TRANSLATIONS USERS FOR ADMIN
router.get('/:desde/:hasta', async (req, res) => {
    const { desde, hasta } = req.params;
    try {
        if(!desde || !hasta) throw "data invalida";
        const responseController = await controller.getALLTransaction( desde, hasta );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//ADD TRANSLATIONS USER
router.post('/', async (req, res) => {
    const { wallet, id, bank, amountSend, amountReceive, moneySend, moneyReceive, network, status } = req.body;
    try {
        if(!wallet || !id || !bank || !amountSend || !amountReceive || !moneySend || !moneyReceive || !network || !status) throw "data invalida";
        const responseController = await controller.addTransaction( wallet, id, bank, amountSend, amountReceive, moneySend, moneyReceive, network, status );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//SET TRANSLATIONS USER
router.put('/:transationId/:status', async (req, res) => {
    const { transationId, status } = req.params;
    try {
        if(!transationId) throw "data invalida";
        const responseController = await controller.setTransaction( transationId, status );
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;