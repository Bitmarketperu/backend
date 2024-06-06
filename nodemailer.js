const nodemailer = require('nodemailer');

const configNodemailer = {
    // emailNodemailer: "bitmarketperu@gmail.com",
    emailNodemailer: "kaltre10@gmail.com",
    passNodemailer: "mnbg okfi nggf dmgl"
}

const configNodemailerTest = {
    emailNodemailer: 'kaltrestars@gmail.com',
    passNodemailer: 'arke cuke icvi aprr'
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configNodemailerTest.emailNodemailer,
        pass: configNodemailerTest.passNodemailer
    },
    secure: true
});

module.exports = { configNodemailer, transporter };