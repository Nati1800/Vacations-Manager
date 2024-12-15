import { useContext, useEffect, useState } from "react";
import { formatDate } from "../../DateFormation/formatDate"
import { fetchFilteredVacations, followVacation, unFollowVacation } from "./service";
import { AuthContext } from "../../Context/authContext";
import ImageFallback from "../../imgs/FallbackImage.jpg"
import { Vacation } from "../../Types/index";




export function VacationsPage() {


    const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;


      const [followed, setFollowed] = useState(false);
      const [isNew, setIsNew] = useState(false);
      const [isActive, setIsActive] = useState(false);
      const [isLoading, setIsLoading] = useState(false)
      

      const [vacations, setVacations] = useState<Vacation[]>([]);

      const getVacations = async () => {
        if (!currentUser) {
            console.error("No current user found.");
            return; 
          }
        try {
            setIsLoading(true)
            const data = await fetchFilteredVacations({
              followed,
              new: isNew,
              active: isActive,
            },
            currentUser 
        );
            setVacations(data);
          } catch (error) {
            console.error('Failed to fetch vacations:', error);
          }finally{
            setIsLoading(false)
          }
      };

      const toggleFollow = async (vacationId: number, isLiked: number) => {
        try {
            if (isLiked === 1) {
                await unFollowVacation(vacationId);
            } else {
                await followVacation(vacationId);
            }

            getVacations();
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };

    

      useEffect(() => {
        if (currentUser) {
            
          }
        getVacations();
      }, [followed, isNew, isActive]);


    
      
    return <>

    <div className="vacationsPage">

    <div className="filters">
        <label>
          <input type="checkbox" checked={followed} onChange={() => setFollowed((prev) => !prev)} /> Show Followed Vacations
        </label>
        <label>
          <input type="checkbox" checked={isNew} onChange={() => setIsNew((prev) => !prev)}/> Show New Vacations
        </label>
        <label>
          <input type="checkbox" checked={isActive} onChange={() => setIsActive((prev) => !prev)}/> Show Active Vacations
        </label>
      </div>

        {<div className="vacations">
            {isLoading ?
             <span className="loader"></span> 
            : vacations.length === 0 ? (
                <p className="no-vacations-message">No Vacations Found!</p>
              ) :
              vacations.map(vacation=>(
                <div className="vacation" key={vacation.id}>
                    <div className="img">
                        <img src={vacation.image} 
                        alt={vacation.destination + ": Couldn't load image"} 
                        loading="lazy"
                        onError={(e:React.SyntheticEvent<HTMLImageElement, Event>)=>{
                            e.currentTarget.src=ImageFallback   
                        }}
                        />
                    </div>
                    <div className="content">
                        <h1>{vacation.destination}</h1>
                        <h2>{`${formatDate(vacation.start_date)} - ${formatDate(vacation.end_date)}`}</h2>
                        <p>{vacation.description}</p>
                        <h3>{`${vacation.price}$`}</h3>
                        
                 {vacation.isLiked === 1 ? (
                   <button
                     className="heart-button liked"
                     onClick={() => toggleFollow(vacation.id, vacation.isLiked)} 
                   >
                     ❤
                   </button>
                 ) : (
                   <button
                     className="heart-button"
                     onClick={() => toggleFollow(vacation.id, vacation.isLiked)}
                   >
                     ❤
                   </button>
                 )}
                        <div className="followers">
                         <span>👤{vacation.followers} Followers</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>}
    </div>
    </>
}