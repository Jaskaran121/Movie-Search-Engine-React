const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

usersSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email
      },
      'PrivateKey'
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
    const token = usersSchema.methods.generateAuthToken();
    callback('Success',token);
   }
catch(ex){
       callback('error');
   }
}

module.exports.getUsers = (callback) =>{
    User.find({},callback).select('-password');
}

module.exports.generateAuthToken = usersSchema.methods.generateAuthToken;
module.exports.User = User;