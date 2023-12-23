const express = require('express')
const route = express.Router()
const controller = require('./controller')
const response = require('../../network/response')
const multer = require('multer')
/* 

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Especifica la carpeta donde se guardarán las imágenes
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Define el nombre del archivo de imagen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage }); 
*/

const upload = multer({ dest: 'uploads/' })
route.post('/', upload.array('image', 3), async (req, res) => {
    /* try {
        const responseController = await controller.loadImages(req.files);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    } */
});

module.exports = route;