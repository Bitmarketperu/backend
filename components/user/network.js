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
    const { _id, name, email, phone } = req.body;
    try {
        if(!_id) throw "id invalid";
        const responseController = await controller.setUser(_id, name, email, phone);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;