import { useContext, useEffect, useState } from "react";
import { deleteVacationApi, fetchFilteredVacations } from "./service";
import { AuthContext } from "../../Context/authContext";
import { formatDate } from "../../DateFormation/formatDate";
import ImageFallback from "../../imgs/FallbackImage.jpg"
import { useNavigate } from "react-router-dom";
import { Vacation } from "../../Types/index";




export function AdminVacationPage() {



    const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;

    const navigate = useNavigate()

    const [isNew, setIsNew] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false)
    const [vacationIdToDelete, setVacationIdToDelete] = useState<number | null>(null)


    const [vacations, setVacations] = useState<Vacation[]>([]);

      const getVacations = async () => {
    try {
      setIsLoading(true);
      const data = await fetchFilteredVacations(
        {
          new: isNew,
          active: isActive,
        },
         currentUser
      );
      setVacations(data);
    } catch (error) {
      console.error("Failed to fetch vacations:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getVacations();
  }, [isNew, isActive]);

const handleDelete = async () => {
    if (!vacationIdToDelete) return new Error("No Vacation Id To Be Deleted")
    try {
        await deleteVacationApi(vacationIdToDelete)
        getVacations()
        setShowModal(false)
    } catch (error) {
        console.log("Error with deleting vacation: " + error)
    }
}

const handleDeleteShowModal = (vacationId : number)=>{
    setVacationIdToDelete(vacationId)
    setShowModal(true)
}

const handleModalCancel =()=>{
    setShowModal(false)
    setVacationIdToDelete(null)
}

const handleAddVacationButton = ()=>{
    navigate("/add/admin")
}

const handleChartButton = ()=>{
    navigate("/chart/admin")
}

const handleEditVacationButton = (vacation : Vacation)=>{
    navigate("/edit/admin", {state : vacation})
}


    
      
  return (
    <>
      <div className="vacationsPage">
        <div className="add-vacation-div">
            <button onClick={handleAddVacationButton} className="add-vacation-btn">
                Add a new vacation
            </button>
            <button onClick={handleChartButton} className="chart-vacation-btn">
                Vacations Chart Report
            </button>
        </div>
        <div className="filters">
          <label>
            <input
              type="checkbox"
              checked={isNew}
              onChange={() => setIsNew((prev) => !prev)}
            />{" "}
            Show New Vacations
          </label>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive((prev) => !prev)}
            />{" "}
            Show Active Vacations
          </label>
        </div>

        <div className="vacations">
          {isLoading ? (
            <span className="loader"></span>
          ) : vacations.length === 0 ? (
            <p className="no-vacations-message">No Vacations Found!</p>
          ) : (
            vacations.map((vacation) => (
              <div className="vacation" key={vacation.id}>
                <div className="img">
                  <img
                    src={vacation.image}
                    alt={vacation.destination + ": Couldn't load image"}
                    loading="lazy"
                    onError={(e:React.SyntheticEvent<HTMLImageElement, Event>)=>{
                        e.currentTarget.src=ImageFallback   
                    }}
                  />
                </div>
                <div className="content">
                  <h1>{vacation.destination}</h1>
                  <h2>{`${formatDate(vacation.start_date)} - ${formatDate(
                    vacation.end_date
                  )}`}</h2>
                  <p>{vacation.description}</p>
                  <h3>{`${vacation.price}$`}</h3>
                  <button onClick={()=> handleDeleteShowModal(vacation.id)} className="trash-btn">
                  Delete🗑️
                  </button>
                  <button onClick={()=> handleEditVacationButton(vacation)} className="edit-btn">
                    Edit✍️
                  </button>
                  <div className="followers">
                    <span>👤{vacation.followers} Followers</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
        <div className="modal-content">
          <h2>Are you sure you want to delete this vacation?</h2>
          <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
          <button className="cancel-btn" onClick={handleModalCancel}>Cancel</button>
        </div>
      </div>
      )}
      
    </>
  );
}