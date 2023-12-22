const nodemailer = require('nodemailer');

const configNodemailer = {
    emailNodemailer: "bitmarketperu@gmail.com",
    passNodemailer: "arke cuke icvi aprr"
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configNodemailer.emailNodemailer,
        pass: configNodemailer.passNodemailer
    },
    secure: true
});

module.exports = { configNodemailer, transporter };