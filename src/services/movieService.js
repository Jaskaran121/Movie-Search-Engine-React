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
}
