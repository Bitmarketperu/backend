// auth login

const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const validateToken = require('../../middlewares/validateToken');

router.post('/', async (req, res) => {

    //recibir nombre y documento 
    const {email, password, name, dni, phone} = req.body;
    try {
        if(!phone || !email || !password || !name || !dni) throw "datos invalidos";
        const responseController = await controller.auth({email, password, name, dni, phone});
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) throw "datos invalidos";
        const responseController = await controller.login(email,password);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, error, 401);
    }
});

router.get('/verify/', validateToken, async (req, res) => {
    try {
        const auth = req.auth = true; // auth success
        response.success(req, res, auth, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;