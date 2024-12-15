import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserApi } from "./service";
import { registerSchema } from "../../ZodSchemas/registerSchema";
import { z } from "zod";



export function RegisterPage() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        first_name : "",
        last_name : "",
        email : "",
        password : ""
    })

    const [error, setError] = useState<string | null>(null)

    function handleChange(e : ChangeEvent<HTMLInputElement>): any{
        const {name , value} = e.target
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e : React.FormEvent){
        e.preventDefault()
        try {
            const validatedInputs = registerSchema.parse(inputs);
            const response = await registerUserApi(validatedInputs); 
            if (response.status === 201) {
                navigate("/login")
            }
        } catch (error : any) {
            if (error instanceof z.ZodError) {
                setError(error.errors.map((err) => err.message).join(", "));
            } else {
                setError(error.response?.data || "An error occurred");
            }
        }
    }


    return <>
    <div className="authentication">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange}/>
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange}/>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
            <button>Submit</button>
            {error && <p>{error}</p>}
            <span>
                Already Got An Account? <Link to="/login">Login Now!</Link>
            </span>
        </form>
    </div>
    </>
}