import axios from "axios";
import apiUrl from "../../ApiUrl";

const apiURL = apiUrl()


type loginUser = {
    email : string,
    password : string
}

export async function loginUserApi(data : loginUser){
   const response = await axios.post(`${apiURL}/auth/login`,data)
   return response.data
}    

