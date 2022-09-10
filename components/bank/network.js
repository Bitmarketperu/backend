const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const validateToken = require('../../middlewares/validateToken');

router.get('/:wallet', validateToken, async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet) throw "data invalid";
        if(!req.user?.wallet) throw "user data invalid";
        const walletToken = req.user.wallet;
        const responseController = await controller.getBank( wallet, walletToken );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.post('/', validateToken, async (req, res) => {
    const { wallet, name, titular, number, type, money } = req.body;
    try {
        if(Object.keys(req.user).length <= 0) throw "user data invalid";
        if(!wallet, !name, !titular, !number, !type, !money) throw "data invalida";
        const walletToken = req.user.wallet;
        const responseController = await controller.addBank( wallet, name, titular, number, type, money, walletToken );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.put('/:wallet/:idBank', validateToken, async (req, res) => {
    const { wallet, idBank } = req.params;
    try {
        if(!wallet || !idBank) throw "data invalida";
        if(Object.keys(req.user).length <= 0) throw "user data invalid";
        const walletToken = req.user.wallet;
        const responseController = await controller.setBank( wallet, walletToken, idBank );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;