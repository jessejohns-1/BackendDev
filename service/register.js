const AWS = require('aws=sdk');
AWS.config.update({
    region:'us-east-2'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'daddylongtable'

async function register(userInfo){
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    if (! username || !name || !email || !password){
        return util.buildResponse(401, {
            message:'all fields are required and we are pretty sure you know that'
        })
    }

    const dynamoUser = await  getUser(username.toLowerCase().trim(),);
    if(dynamoUser && dynamoUser.name)
    {
        return util.buildResponse(401,{
            message: 'username exists or we just dont want you to have it so try again'
        })
    }
    const encryptedPW = bcrypt.hashSync(password.trim(), 8);
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW
        
    }

    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse){
        return util.buildResponse(503,{ message: 'Server Error. Please try again later.'})
    }

    return util.buildResponse(200, { username: username})
}