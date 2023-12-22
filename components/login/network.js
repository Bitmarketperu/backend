// auth login
const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const validateToken = require('../../middlewares/validateToken');
const { transporter, configNodemailer } = require('../../nodemailer');

//registrar nuevo usuario
router.post('/', async (req, res) => {
    const { email, password, name, dni, phone } = req.body;
    try {
        if (!phone || !email || !password || !name || !dni) throw "datos invalidos";
        const responseController = await controller.auth({ email, password, name, dni, phone });
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//hacer login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) throw "datos invalidos";
        const responseController = await controller.login(email, password);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, error, 401);
    }
});


//la verdad no que hace esto
router.get('/verify/', validateToken, async (req, res) => {
    try {
        const auth = req.auth = true; // auth success
        response.success(req, res, auth, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//recuperar contrasena
router.post('/rememberpass/', async (req, res) => {
    const { email } = req.body
    if (!email) throw "datos invalidos"
    try {
        const user = await controller.getUser(email)
        if (user) {

            //usear nodemailer para enviar correo
            const mailOptions = {
                from: configNodemailer.emailNodemailer,
                to: email,
                subject: `Recuperacion de contraseña bitmarketPeru`,
                text: `Contraseña de bitmarketperu.com: ${user.password}`,
            }
            await transporter.sendMail(mailOptions)

            //Correo enviado con exito
            res.json({ status: true, message: "Se le ha enviado un correo de recuperacion" })
        } else {
            //usuario no esta registrado
            res.json({ status: false, message: "Usuario no registrado" })
        }
    } catch (error) {
        res.json({ status: false, message: "Ha ocurrido un error" })
    }
});

module.exports = router;