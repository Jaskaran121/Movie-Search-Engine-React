<<<<<<< HEAD
import { getGenres } from "./genreService";
import axios from "axios";
import config from "../config.json";
const movies = [];

export async function getMovies() {
  const get_movies = await axios.get("http://localhost:3900/api/movies");
  return get_movies.data.sucess;
}

export async function saveMovie(movie) {
  let genreName = await getGenres();
  let name = genreName.find(g=>g._id===movie.genreId);
    const new_Movie = await axios.post("http://localhost:3900/api/movie/insert",{
      "title": movie.title,
      "numberInStock": movie.numberInStock,
      "dailyRentalRate": movie.dailyRentalRate,
      "genreId": movie.genreId,
      "genreName":name.name
  })
  return new_Movie;
   
}

export async function getMovie(movieId) {
const movie = await axios.get(`http://localhost:3900/api/movie/${movieId}`);
return movie;
}

export async function deleteMovie(id) {
  const delete_movie = await axios.delete(
    `http://localhost:3900/api/movie/delete/${id}`
  );
  return delete_movie;
=======
import * as genresAPI from "./fakeGenreService";
import axios from "axios";
const movies = [];

export async function getMovies() {
  const get_movies = await axios.get("http://localhost:8000/api/movies");
  return get_movies.data.sucess;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);

  return movieInDb;
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
}
