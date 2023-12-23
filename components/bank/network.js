const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const validateToken = require('../../middlewares/validateToken');

router.get('/:dni', validateToken, async (req, res) => {
    // const { dni } = req.params;
    try {
        // if (!dni) throw "data invalid";
        // if (!req.user?.dni) throw "user data invalid";
        const user = req.user._id;
        /* console.log('DNITOKEN===>', dniToken)
        console.log('DNI===>', dni) */
        // const responseController = await controller.getBank(dni, dniToken);
        const responseController = await controller.getBank(user);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

/* router.post('/', validateToken, async (req, res) => {
    const { dni, name, titular, number, type, money } = req.body;
    try {
        if(Object.keys(req.user).length <= 0) throw "user data invalid";
        if(!dni, !name, !titular, !number, !type, !money) throw "data invalida";
        const dniToken = req.user.dni;
        const responseController = await controller.addBank( dni, name, titular, number, type, money, dniToken );
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
}); */

router.post('/', validateToken,async (req, res) => {
    const { dni, name, titular, number, type, money } = req.body;
    try {
        if (Object.keys(req.user).length <= 0) throw "user data invalid";
        if (!dni, !name, !titular, !number, !type, !money) throw "Invalid Data incompleted";
        const dniToken = req.user.dni;
        const user = req.user._id;
        const responseController = await controller.addBank(dni, name, titular, number, type, money, dniToken, user);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
})

router.put('/:dni/:idBank', validateToken, async (req, res) => {
    const { dni, idBank } = req.params;
    try {
        if (!dni || !idBank) throw "data invalida";
        if (Object.keys(req.user).length <= 0) throw "user data invalid";
        const dniToken = req.user.dni;
        const responseController = await controller.setBank(dni, dniToken, idBank);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;