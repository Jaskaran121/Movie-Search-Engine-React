const mongoose = require("mongoose");

// Genre Schema
<<<<<<< HEAD
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model("genres", genreSchema);
=======
const genreSchema = mongoose.Schema({
  genre: {
    type: String,
    required: true
  }
});

const Genre = (module.exports = mongoose.model("genres", genreSchema));
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f

// Get Genres
module.exports.getGenres = (limit, callback) => {
  Genre.find({}, callback);
};
<<<<<<< HEAD

exports.genreSchema = genreSchema;
exports.Genre = Genre;
=======
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
