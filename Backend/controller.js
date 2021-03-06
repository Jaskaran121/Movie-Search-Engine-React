const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Movie = require("./movies");
const Users = require("./users");
const Auth = require("./auth");
const jwt = require('jsonwebtoken');
const config = require("./config.json");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

Genre = require("./genres");
mongoose.set('useCreateIndex', true);
// Connect to Mongoose
mongoose.connect("mongodb://localhost/movieDB", { useNewUrlParser: true });
var db = mongoose.connection;

app.get("/", (req, res) => {
  res.send("Please use /api/books or /api/genres");
});

app.get("/api/genres", (req, res) => {
  Genre.getGenres(10, function(err, result) {
    if (!err) res.status(200).json({ sucess: result });
    else res.status(400).json({ error: "Not able to get Values" });
  });
});

app.get("/api/movies",(req, res) => {
  Movie.getMovies(100, function(err, result) {
    if (!err) res.status(200).json({ sucess: result });
    else res.status(400).json({ error: "Not able to get Values" });
  });
});


app.delete("/api/movie/delete/:id", verifyToken,(req, res) => {
  Movie.deleteMovie(req.params.id, function(type) {
    if (type === "success")
      res.status(200).json({ success: "Movie deleted Successfully" });
    else res.status(400).json({ error: "Movie not present in the database" });
  });
});

//adding new movie
app.post("/api/movie/insert",verifyToken,(req,res) =>{
  
  Movie.insertMovie(req.body.title,req.body.numberInStock,req.body.dailyRentalRate,
    req.body.genreId,req.body.genreName,function(type){
      if(type==="Success")
        res.status(200).json({success:"Movie Added Successfully"});
        else
        res.status(400).json({error:"Unable to Insert Values"});
    })
})

//Editing old movie
app.put("/api/movie/:id",verifyToken,(req,res) =>{
  Movie.editMovie(req.params.id,req.body.title,req.body.numberInStock,req.body.dailyRentalRate,
    req.body.genreId,function(type){
      if(type==="Success")
        res.status(200).json({success:"Movie Edited Successfully"});
        else
        res.status(400).json({error:"Unable to Insert Values"});
    })
})

//getting a single movie
app.get("/api/movie/:id",verifyToken,(req,res)=>{
  Movie.getMovie(req.params.id,function(err,result){
    if(!err) res.status(200).json({success:result});
    else
    res.status(400).json({error:"Not able to fetch data"});
  })
})


//registering user
app.post("/api/user/register",(req,res)=>{
Users.registerUser(req.body.name,req.body.email,req.body.password,function(type,token){
  if(type=="Success")
    res.status(200).json({data:token});
    else
    res.status(400).json({error:"Duplicate User Already Exists"});
})
})

app.get("/api/users", verifyToken,(req, res) => {
  Users.getUsers(function(err, result) {
    if (!err) res.status(200).json({ success: result });
    else res.status(400).json({ error: "Not able to get Values" });
  });
});

app.post("/api/login",(req,res) =>{
  Auth.login(req.body.email,req.body.password,function(type,result){
    if(type==="Success")
      res.status(200).json({data:result,user:req.body.email});
      else
      res.status(400).json({data:result});
  })
})

//Format of bearer header 
// Authorization: Bearer <access_Token> 
function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  if(typeof bearerHeader !== 'undefined')
  {
    req.Token = bearerHeader;
    try{
      const decoded = jwt.verify(req.Token,config.key);
      req.user = decoded;
      next();
    } catch(ex){
      res.status(401).json({Message:"Invalid Token"})
    }
  }
  else{
    res.status(403).json({Message:"Acess Denied No Token Provided"});
  }
}
app.listen(3900);
console.log("Running on port 3900...");