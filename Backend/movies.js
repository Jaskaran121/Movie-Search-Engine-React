const mongoose = require("mongoose");
const index = require('./../Backend/index');
//const {genreSchema} = require('./../Backend/genres');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Movies = mongoose.model('movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
    },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));
// Get Movies
module.exports.getMovies = (limit, callback) => {
  Movies.find({}, callback);
};

//delete movie
module.exports.deleteMovie = async (id, callback) => {
  const movie = await Movies.findByIdAndDelete(id);
  if (!movie) callback("error");
  else callback("success");
};

//Insert New Movie

module.exports.insertMovie = (title,numberInStock,dailyRentalRate,genreId,genreName,callback) =>{
const newMovie = new Movies({title:title,numberInStock:numberInStock,dailyRentalRate: dailyRentalRate,
  genre :{_id:genreId,name:genreName}});
  console.log(newMovie);
  const result = newMovie.save();
 
  if(result)
  callback("Success");
  else
  callback("error");
}

// Get Movies
module.exports.getMovie = (id, callback) => {
  Movies.findById(id,callback);
};




