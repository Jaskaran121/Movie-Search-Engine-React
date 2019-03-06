import axios from "axios";

export async function registerUser(user) {
const response = await axios.post("http://localhost:3900/api/user/register",{
    email:user.username,
    password:user.password,
    name:user.name
});

return response.data;
}