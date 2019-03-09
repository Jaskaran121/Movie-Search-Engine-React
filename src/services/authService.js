import axios from "axios";
import config from "../config.json";

export async function login(email,password) {
 
  const {data:jwt} = await axios.post(`${config.apiUrl}/login`,{email,password});
  localStorage.setItem('token',jwt.data);
}