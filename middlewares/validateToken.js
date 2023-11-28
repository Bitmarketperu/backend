const jwt = require('jsonwebtoken')
const response = require('../network/response')

const validateToken = (req, res, next)  => {
        req.user = {}
        const authorization = req.headers.authorization || ''
   
        authorization.replace('"')
        try {
            if(authorization.includes('Bearer')){
                const token = authorization.slice(7)
                
                jwt.verify(token, process.env.DATA_TOKEN, (err, decoded) => {
                    if(err) throw 'Error token'
                    req.auth = true;
                    //el bartolo
                    req.user = decoded
                    req.user.dni = decoded.dni
                    req.user.level = decoded.level
                    req.user._id = decoded._id

                    next()
                })
            }else{
                throw 'No authorization Bearer'
            }
        } catch (error) {
            console.log(error)
            response.error(req, res, error, 401)
        }
        
} 

module.exports = validateToken