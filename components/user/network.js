const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const validateToken = require('../../middlewares/validateToken');

//GET ALL USERS
router.get('/', validateToken,  async (req, res) => {
    try {
        if(!req.user?.level) throw 'Level Data invalid'
        const level  = req.user.level
        const responseController = await controller.getAll(level);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//UPDATE USER
router.put('/',validateToken, async (req, res) => {
    const { wallet, _id, name, email, phone, dni, kyc } = req.body;
    try {
        if(!_id || !dni) throw "id invalid";
        if(!req.user?._id) throw "Token not found";
        const userToken = req.user;
        const responseController = await controller.setUser( wallet, _id, name, email, phone, dni.toString(), kyc, userToken);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;