import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Vacation } from "../../Types/index";
import ImageFallback from "../../imgs/FallbackImage.jpg";
import { formatDateForInput } from "../../DateFormation/formatDate";
import { editVacationApi } from "./service";
import { editVacationSchema } from "../../ZodSchemas/editVacationSchema";
import { z } from "zod";

export function EditVacationPage() {

    const navigate = useNavigate()

    const location = useLocation()

    const vacationFromState = location.state as Vacation
    if (!vacationFromState) {
        return <p className="no-vacation-data">No Vacation Data</p>
    }

    const [error, setError] = useState<string | null>(null)

    const [inputs, setInputs] = useState({
        destination : vacationFromState.destination,
        description : vacationFromState.description,
        start_date : formatDateForInput(vacationFromState.start_date),
        end_date : formatDateForInput(vacationFromState.end_date),
        price : vacationFromState.price,
        image : vacationFromState.image,
    })
    function handleChange(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ): any{
        const {name , value} = e.target
        setInputs(prev => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value
        }));
    }

    async function handleSubmit(e : React.FormEvent){
        e.preventDefault()
        try {
            const validatedInputs = editVacationSchema.parse(inputs)
            const vacationId = vacationFromState.id
            const response = await editVacationApi(validatedInputs , vacationId); 
            if (response.status === 200) {
                navigate("/vacations/admin")
            }
        } catch (error : any) {
            if (error instanceof z.ZodError) {
                setError(error.errors.map(err => err.message).join(", "));
            } else {
                setError(error.response?.data || "An unexpected error occurred");
            }
        }
    }

    

    const handleBackToVacationsButton = ()=>{
        navigate("/vacations/admin")
    }

    return (
      <>
      <div className="back-button-container">
        <button onClick={handleBackToVacationsButton} className="back-to-vacations-btn">Back To Vacations</button>
      </div>
    <div className="edit-vacation">
        
        <form onSubmit={handleSubmit}>
            <h1>Edit Vacation</h1>
            <input type="text" name="destination" placeholder="Enter The Vacation Destination"
             defaultValue={inputs.destination} onChange={handleChange}/>
            <textarea
                 name="description"
                 placeholder="Enter The Vacation Description"
                 defaultValue={inputs.description}
                 onChange={handleChange}
            />
            <input type="date" name="start_date" placeholder="Enter The Vacation Start Date"
             defaultValue={inputs.start_date} onChange={handleChange}/>
            <input type="date" name="end_date" placeholder="Enter The Vacation End Date" 
             defaultValue={inputs.end_date} onChange={handleChange}/>
            <input type="number" name="price" placeholder="Enter The Vacation Price $" 
             defaultValue={inputs.price} onChange={handleChange}/>
            <input type="text" name="image" placeholder="Enter The Vacation Image Link" 
             defaultValue={inputs.image} onChange={handleChange}/>
            <div className="current-image">
            <h4>Current Image:</h4>
            <img
              src={inputs.image}
              alt="Vacation"
              className="preview-vacation-image"
              onError={(e:React.SyntheticEvent<HTMLImageElement, Event>)=>{
                e.currentTarget.src=ImageFallback   
            }}
            />
          </div>
            <button>Submit</button>
            {error && <p>{error}</p>}
        </form>
    </div>
    </>  
    )
    
}