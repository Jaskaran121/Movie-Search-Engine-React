const mongoose = require("mongoose");

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

//Registering new user
module.exports.registerUser = async (name,email,password,callback) =>{


const check = await User.findOne({email:email});

if(check){
    callback("error");
    }
       
    const newUser = new User({name:name,email:email,password:password});
    const result = await newUser.save();

    if(result){
        callback("Success");
    }
    else
        callback("error");


}

module.exports.getUsers = (callback) =>{
    User.find({},callback).select('-password');
}
