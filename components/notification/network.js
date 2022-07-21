const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//GET NOTIFICATIONS USER
router.get('/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet) throw "data invalida";
        const responseController = await controller.getNotification( wallet );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//GET ALL NOTIFICATIONS FOR ADMIN
router.get('/', async (req, res) => {
    try {
        const responseController = await controller.getAllNotifications();
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//ADD NOTIFICATION USER
router.post('/', async (req, res) => {
    const { wallet, title, description } = req.body;
    try {
        if(!wallet || !title || !description) throw "data invalida";
        const responseController = await controller.addNotification( wallet, title, description );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;