const express = require('express');
const route = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

route.post('/', async (req, res) => {
    const {sender} = req.body 
    console.log(sender)
    try {
        const responseController = await controller.post(sender);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = route;