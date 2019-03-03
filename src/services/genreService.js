import axios from "axios";
import config from "../config.json";


export async function getGenres() {
  var Genres = [];
  const get_Genres = await axios.get("http://localhost:3900/api/genres");
  get_Genres.data.sucess.forEach(element => {
    Genres.push(element);
  });
  return Genres;
}

