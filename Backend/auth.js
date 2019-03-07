const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User,generateAuthToken } = require('../Backend/users');

module.exports.login =  async (email,password,callback) =>{
    let user = await User.findOne({ email: email });
    try{
        if(user.password === password){
            const token = generateAuthToken(user);
            callback("Success",token);
        } 
        else
        callback("error","Password not Correct"); 
    }
    catch(ex)
    {
        callback("error","Email Id not Found");
    }
}