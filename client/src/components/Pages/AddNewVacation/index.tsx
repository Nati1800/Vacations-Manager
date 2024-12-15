import { ChangeEvent, useState } from "react"
import { addNewVacationApi } from "./service";
import { useNavigate } from "react-router-dom";
import { addVacationSchema } from "../../ZodSchemas/addVacationSchema";
import { z } from "zod";


export function AddNewVacationPage() {

    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const [inputs, setInputs] = useState({
        destination : "",
        description : "",
        start_date : "",
        end_date : "",
        price : 0,
        image : "",
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
            const validatedInputs = addVacationSchema.parse(inputs)
            const response = await addNewVacationApi(validatedInputs); 
            if (response.status === 201) {
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
    <div className="add-vacation">
        
        <form onSubmit={handleSubmit}>
            <h1>Add A New Vacation</h1>
            <input type="text" name="destination" placeholder="Enter The Vacation Destination" onChange={handleChange}/>
            <textarea
                 name="description"
                 placeholder="Enter The Vacation Description"
                 onChange={handleChange}
            />
            <input type="date" name="start_date" placeholder="Enter The Vacation Start Date" onChange={handleChange}/>
            <input type="date" name="end_date" placeholder="Enter The Vacation End Date" onChange={handleChange}/>
            <input type="number"  name="price" placeholder="Enter The Vacation Price $" onChange={handleChange}/>
            <input type="text" name="image" placeholder="Enter The Vacation Image Link" onChange={handleChange}/>
            <button>Submit</button>
            {error && <p>{error}</p>}
        </form>
    </div>
    </>  
    )
    
}