const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//GET ALL TRANSLATIONS USER
router.get('/:dni/:desde/:hasta', async (req, res) => {
    const { dni, desde, hasta } = req.params;
    try {
        if (!dni || !desde || !hasta) throw "data invalida";
        const responseController = await controller.getUserTransaction(dni, desde, hasta);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//GET TRANSLATIONS 10 LATES USDT
router.get('/lates', async (req, res) => {
    try {
        const responseController = await controller.getTransactionLates();
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
        if (!desde || !hasta) throw "data invalida";
        const responseController = await controller.getALLTransaction(desde, hasta);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//ADD TRANSLATIONS USER
router.post('/', async (req, res) => {

    const { dni, wallet, id, amountSend, amountReceive, moneySend, moneyReceive, network, status, bankAdmin, bank, reciveUser, reciveNetwork, reciveMethod, payMethod, origen, politico, userIdTransaction } = req.body;

    try {
        if (!dni || !id || !amountSend || !amountReceive || !moneySend || !moneyReceive || !network || !status || !bankAdmin || !bank || !reciveUser || !reciveNetwork || !reciveMethod || !payMethod || !userIdTransaction) throw "data invalida";
        const responseController = await controller.addTransaction(dni, wallet, id, amountSend, amountReceive, moneySend, moneyReceive, network, status, bankAdmin, bank, reciveUser, reciveNetwork, reciveMethod, payMethod, origen, politico, userIdTransaction);
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
        if (!transationId) throw "data invalida";
        const responseController = await controller.setTransaction(transationId, status);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;