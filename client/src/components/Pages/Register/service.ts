import axios from "axios";
import apiUrl from "../../ApiUrl";

const apiURL = apiUrl()

type registerUser = {
    first_name : string ,
    last_name : string,
    email : string,
    password : string
}

export async function registerUserApi(data : registerUser){
   return await axios.post(`${apiURL}/auth/register`,data)
}