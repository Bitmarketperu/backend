const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//GET CONFIG
router.get('/', async (req, res) => {
    try {
        const responseController = await controller.getConfig();
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//SET CONFIG
router.put('/', async (req, res) => {
    const { dolOut, dolInp, solOut, solInp, maxSol, maxDol, maxCrypto, limSol, limDol, sellBit, buyBit  } = req.body;
    try {
        if(!dolOut || !dolInp || !solOut || !solInp || !maxSol || !maxDol || !limSol || !limDol || !sellBit || !buyBit) throw "data invalida";
        const responseController = await controller.setConfig( dolOut, dolInp, solOut, solInp, maxSol, maxDol, maxCrypto, limSol, limDol, sellBit, buyBit );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;