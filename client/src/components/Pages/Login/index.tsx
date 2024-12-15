import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../Context/authContext";
import { loginSchema } from "../../ZodSchemas/loginSchema";
import { z } from "zod";



export function LoginPage() {
    

    const navigate = useNavigate();

    const { login , currentUser } = useContext(AuthContext) as AuthContextType

    useEffect(() => {
        if (currentUser) {
          navigate(currentUser.role === "admin" ? "/vacations/admin" : "/vacations");
        }
      }, [currentUser, navigate]);

    const [inputs, setInputs] = useState({
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
            const validatedInputs = loginSchema.parse(inputs);
           const user = await login(validatedInputs) as any
           if (user.role === "admin") {
            navigate("/vacations/admin")
           } else{
            navigate("/vacations")   
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
        <h1>Login</h1>
        <form>
            <input type="email" placeholder="Email Address" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Submit</button>
            {error && <p>{error}</p>}
            <span>
                Don't Have An Account? <Link to="/register">Register Now!</Link>
            </span>
        </form>
    </div>
    </>
}