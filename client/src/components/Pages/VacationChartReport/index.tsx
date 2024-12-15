import { useEffect, useState } from "react";
import { fetchVacationsForChart } from "./service";
import { useNavigate } from "react-router-dom";
import { chartVacation } from "../../Types/chartVacationType";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import  {Bar} from "react-chartjs-2";

export function VacationChartPage(){
    
    const navigate = useNavigate()
    
    const [vacations, setVacations] = useState<chartVacation[]>([]);
    const [isLoading, setIsLoading] = useState(false);


      const getVacationsReport = async () => {
    try {
      setIsLoading(true);
      const data = await fetchVacationsForChart();
      setVacations(data);
    } catch (error) {
      console.error("Failed to fetch vacations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVacationsReport();
  }, []);
 
  const handleBackToVacationsButton = ()=>{
    navigate("/vacations/admin")
}
  

const handleDownloadCSV = () => {
    const csvContent = [
      ["Destination", "Followers"], 
      ...vacations.map((vacation) => [vacation.destination, vacation.followers_count]),
    ]
      .map((row) => row.join(",")) 
      .join("\n"); 

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vacations.csv");
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
 
  const VacationChart = () => {
    
    
    const chartData = {    
        
      labels: vacations.map((vacation) => vacation.destination), 
      datasets: [
        {
          label: "Followers",
          data: vacations.map((vacation) => vacation.followers_count), 
          backgroundColor: "indigo", 
        },
      ],
    };
  
    
    const chartOptions = {
      responsive: true,
      scales : {
        y:{
            ticks: {
                beginAtZero: true, 
                stepSize: 1, 
            },
            min: 0,
        }
      },
      plugins: {
        legend: {
          display: true, 
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Vacation Followers by Destination",
        },
      },
    };
  
    return <Bar data={chartData} options={chartOptions} />;
  };



    return(
        <>
        <div>
            <button onClick={handleBackToVacationsButton} className="back-to-vacations-btn">Back To Vacations</button>
            <button onClick={handleDownloadCSV}>Download CSV File</button>
        </div>
        {isLoading ?
        (<span className="loader"></span>) 
            : vacations.length === 0 ? (
                <p className="no-vacations-chart-message">No Vacations Found!</p>
              ) : (
         <div>
            <VacationChart/>
        </div>   
               )
        } 
        
        </>
    )
}