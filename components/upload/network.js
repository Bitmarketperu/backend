const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs/promises');
const response = require('../../network/response');
const store = require('../login/store');
const { transporter, configNodemailer } = require('../../nodemailer');

// const deleteFile = async (files) => {
//     await Promise.all(files.map(file => fs.unlink(file.path)));
// }

// Configuración de multer para manejar el almacenamiento de archivos
// const storage = multer.diskStorage({
//     destination: './files', // Carpeta donde se guardarán los archivos
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({ storage });

//ADD TRANSLATIONS USER
// router.post('/:dni', upload.array('image', 3), async (req, res) => {
router.post('/:dni', async (req, res) => {
    /* const responseController = {message:"success upload"} 
     */

    const { dni } = req.params
    const { email, name } = await store.getFromDni(dni)

    let images;

    try {
        images = req.body.images;
        if (!images || images.length !== 3) {
            throw new Error('Se requieren exactamente 3 imágenes.');
        }
    } catch (error) {
        return response.error(req, res, { message: "ERROR", error: error.message }, 400);
    }

    const attachments = images.map((image, index) => ({
        filename: `image${index + 1}.jpg`,
        content: image.split(';base64,').pop(),
        encoding: 'base64'
    }));

    try {
        const mailOptions = {
            from: 'bitmarketperu.com',
            to: configNodemailer.emailNodemailer,
            subject: `DNI: ${dni} - Email: ${email} - Name: ${name}`,
            text: 'Adjunto encontrarás las imágenes del nuevo usuario.',
            attachments: attachments
        };

        await transporter.sendMail(mailOptions);
        response.success(req, res, { message: "SUCCESS" }, 200);
    } catch (error) {
        response.error(req, res, { message: "ERROR", error: error.message }, 500);
    }

   
    // try {
    //     const mailOptions = {
    //         from: 'bitmarketperu.com',
    //         to: configNodemailer.emailNodemailer,
    //         subject: `DNI: ${dni} - Email: ${email} - Name: ${name}`,
    //         text: 'Adjunto encontrarás las imágenes del nuevo usuario.',
    //         attachments: req.files.map(file => ({
    //             filename: file.originalname,
    //             path: file.path
    //         }))
    //     };
    //     await transporter.sendMail(mailOptions)
    //     await deleteFile(req.files)
    //     response.success(req, res, {message:"SUCCESS"}, 200);
        
    // } catch (error) {
    //     response.success(req, res, {message:"ERROR"}, 404);
    // }
});

module.exports = router;