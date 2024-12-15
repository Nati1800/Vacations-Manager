import axios from "axios";
import apiUrl from "../../ApiUrl";
import { editVacation } from "../../Types/editVacationType";

const apiURL = apiUrl()

export async function editVacationApi(data : editVacation, vacationId : number){
   return await axios.put(`${apiURL}/vacations/edit/${vacationId}`,data,{
    withCredentials: true
   })
}