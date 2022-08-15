const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/:idTransaction', async (req, res) => {
    const { idTransaction } = req.params;
    try {
        if(!idTransaction) throw "data invalida";
        const responseController = await controller.get( idTransaction );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.post('/', async (req, res) => {
    const { idTransaction, description, idUser } = req.body;
    try {
        if(!idTransaction || !description || !idUser) throw "data invalida";
        const responseController = await controller.save( idTransaction, description, idUser );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});


module.exports = router;