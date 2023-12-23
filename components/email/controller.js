const nodemailer = require("nodemailer")

const loadImages = (files) => {

    /* const { originalname, path } = req.file
    const pass = process.env.APPLICATION_PASS_GMAIL_MANUEL
    const user = 'manuelperez.0000@gmail.com'
    const service = 'gmail'
    const auth = { user, pass }
    const transportData = { service, auth } */

    return new Promise(async (resolve, reject) => {
        try {

           /*  var transporter = nodemailer.createTransport(transportData)

            const mailOptions = {
                from: "sender@example.com",
                to: 'manuelperez.0000@gmail.com',
                subject: 'Asunto del correo',
                text: 'Cuerpo del correo',
                attachments: [
                    {
                        filename: originalname,
                        path,
                    }
                ]
            } */

            /*
            const result = await transporter.sendMail(mailOptions);
             console.log('Correo enviado:', result);
            console.log("Message sent: %s", info.messageId) */
            resolve({
                message: "successfully"
            })
        } catch (error) {
            reject(error);
        }
    })

}

module.exports = {
    loadImages
}