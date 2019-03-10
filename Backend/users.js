const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require('./config.json');
//User Schema
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        min:5,
        max:15
    }
})

const User = mongoose.model("users",usersSchema);

function generateAuthToken(user) {
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      config.key
    );
    return token;
  };

//Registering new user
module.exports.registerUser = async (name,email,password,callback) =>{
try{
    await User.findOne({email:email});
}
catch(ex){
    callback("error");
}

try{
    const newUser = new User({name:name,email:email,password:password});
    await newUser.save();
    const token = generateAuthToken(newUser);
    callback('Success',token);
   }
catch(ex){
       callback('error');
   }
}

module.exports.getUsers = (callback) =>{
    User.find({},callback).select('-password');
}

module.exports.generateAuthToken = generateAuthToken;
module.exports.User = User;