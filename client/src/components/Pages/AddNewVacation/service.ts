import axios from "axios";
import apiUrl from "../../ApiUrl";

const apiURL = apiUrl()


export async function addNewVacationApi(data : any){
   return await axios.post(`${apiURL}/vacations/add`,data,{
    withCredentials: true
   })
}