import axios from "axios";
import config from "../config.json";
const movies = [];

export async function login(email,password) {
  const login = await axios.post("http://localhost:3900/api/login",{email,password});
  return login.data;
}