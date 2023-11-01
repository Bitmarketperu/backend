const post = (sender) => {

    return new Promise(async (resolve, reject) => {
        try {


            //enviar el correo

            resolve({
                message: "successfully",
                sender
            })

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    post
}