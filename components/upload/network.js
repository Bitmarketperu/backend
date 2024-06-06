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
    const attachments = [];
    let buffer = Buffer.alloc(0);

    req.on('data', chunk => {
        buffer = Buffer.concat([buffer, chunk]);
    });

    req.on('end', async () => {
        const boundary = '--' + req.headers['content-type'].split('=')[1];
        const parts = buffer.toString().split(boundary).filter(part => part.includes('Content-Disposition'));

        parts.forEach(part => {
            const filenameMatch = part.match(/filename="(.+?)"/);
            const filename = filenameMatch ? filenameMatch[1] : 'unknown';
            const dataIndex = part.indexOf('\r\n\r\n') + 4;
            const fileData = part.slice(dataIndex, part.lastIndexOf('\r\n'));

            attachments.push({
                filename: filename,
                content: Buffer.from(fileData, 'binary')
            });
        });

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
            response.error(req, res, { message: "ERROR", error: error.message }, 404);
        }
    });
    
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