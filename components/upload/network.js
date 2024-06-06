const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs/promises');
const response = require('../../network/response');
const store = require('../login/store');
const formidable = require('formidable');
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
    const form = formidable({ multiples: true });
       
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing the files', err);
            return response.error(req, res, { message: "ERROR", error: err.message }, 400);
        }

        try {
            const attachments = [];

            for (const fileKey in files) {
                const file = files[fileKey];
                const fileData = await fs.promises.readFile(file.filepath);
                attachments.push({
                    filename: file.originalFilename,
                    content: fileData
                });
            }

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
            console.error('Error sending email', error);
            response.error(req, res, { message: "ERROR", error: error.message }, 500);
        }
    });
    response.success(req, res, { message: "SUCCESS" }, 200);
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