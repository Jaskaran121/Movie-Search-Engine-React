const mongoose = require("mongoose");

// Genre Schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model("genres", genreSchema);

// Get Genres
module.exports.getGenres = (limit, callback) => {
  Genre.find({}, callback);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
