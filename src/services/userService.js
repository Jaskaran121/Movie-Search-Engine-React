import axios from "axios";
import config from "../config.json";

export async function registerUser(user) {
const response = await axios.post(`${config.apiUrl}/user/register`,{
    email:user.username,
    password:user.password,
    name:user.name
});

return response.data;
}