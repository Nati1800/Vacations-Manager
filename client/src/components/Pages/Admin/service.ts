import axios from "axios";
import apiUrl from "../../ApiUrl";

const apiURL= apiUrl()

export async function fetchFilteredVacations(filters: {
    followed?: boolean;
    new?: boolean;
    active?: boolean;
  },
  currentUser: any
) {
    const params = new URLSearchParams();
  
    if (filters.followed) params.append("followed", "true");
    if (filters.new) params.append("new", "true");
    if (filters.active) params.append("active", "true");

    if (currentUser && currentUser.id) { 
        params.append("userId", currentUser.id.toString());
      }
  
      try {
        const { data } = await axios.get(`${apiURL}/vacations?${params.toString()}`, {
            withCredentials: true, 
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch vacations:", error);
        throw error;
    }
  }



  export async function deleteVacationApi(vacationId : number) {
    try {
        await axios.delete(`${apiURL}/vacations/delete/${vacationId}`,{
            withCredentials: true
        })
    } catch (error) {
        console.log(error)
    }
}