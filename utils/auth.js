const jtw = require('jsonwebtoken');

function generateToken(userInfo) {
    if(!userInfo){
        return null;
    }
    return jtw.sign(userInfo, process.env.JWT_SECRET,{
        expiresIn: '1h'
    })
}

function verifyToken(username, token){
    return JWT.verify(token, process.env.JWT_SECRET, (error, response)=>{
        if(error){
            return {
                verified: false,
                message: 'invalid Token brotherrr'
            }
        }

        if (response.username !== username){
            return {
                verified: false,
                message: 'invalid user'
            }
        }
        return {
            verified: true,
            message:'verified'
        }
    })
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;