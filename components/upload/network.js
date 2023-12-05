const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs/promises');
const response = require('../../network/response');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kaltrestars@gmail.com',
        pass: 'arke cuke icvi aprr'
    },
    secure: true
});

const deleteFile = async (files) => {
    await Promise.all(files.map(file => fs.unlink(file.path)));
}

// Configuración de multer para manejar el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: './files', // Carpeta donde se guardarán los archivos
    filename: (req, file, cb) => {
        console.log(file.fieldname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

//ADD TRANSLATIONS USER
router.post('/:dni', upload.array('image', 3), async (req, res) => {
    /* const responseController = {message:"success upload"} 
     */

    const { dni } = req.params
    const email = 'dni@example.com'
    try {
        const mailOptions = {
            from: 'kaltrestart@gmail.com',
            to: 'manuelperez.0000@gmail.com',
            subject: `DNI: ${dni} - EMAIL: ${email}`,
            text: 'Adjunto encontrarás las imágenes que has subido.',
            attachments: req.files.map(file => ({
                filename: file.originalname,
                path: file.path
            }))
        };
        await transporter.sendMail(mailOptions)
        await deleteFile(req.files)
        response.success(req, res, {message:"SUCCESS"}, 200);
        
    } catch (error) {
        response.success(req, res, {message:"ERROR"}, 404);
    }
})

module.exports = router;