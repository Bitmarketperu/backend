const express = require('express')
const route = express.Router()
const controller = require('./controller')
const response = require('../../network/response')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

route.post('/', upload.single('image'), async (req, res) => {

     try {
         const responseController = await controller.post(req);
         response.success(req, res, responseController, 200);
     } catch (error) {
         console.log(error)
         response.error(req, res, error, 401);
     }
});

module.exports = route;