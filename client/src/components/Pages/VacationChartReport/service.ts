import axios from "axios";
import apiUrl from "../../ApiUrl";


const apiURL= apiUrl()

export async function fetchVacationsForChart() {
      try {
        const { data } = await axios.get(`${apiURL}/vacations/report`, {
            withCredentials: true, 
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch vacations:", error);
        throw error;
    }   
  }

