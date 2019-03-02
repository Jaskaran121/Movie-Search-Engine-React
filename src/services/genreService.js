import axios from "axios";
<<<<<<< HEAD
import config from "../config.json";


export async function getGenres() {
  var Genres = [];
  const get_Genres = await axios.get("http://localhost:3900/api/genres");
  get_Genres.data.sucess.forEach(element => {
    Genres.push(element);
  });
  return Genres;
}

=======

export async function getGenres() {
  const get_movies = await axios.get("http://localhost:8000/api/genres");
  return get_movies.data.sucess;
}
>>>>>>> 647ac59dd2d26e4e1cb8d20dafcce799b029b70f
