import Logo from "../imgs/vacationsLogo.jpg"
import { useContext } from "react"
import { AuthContext, AuthContextType } from "../Context/authContext"
import { useNavigate } from "react-router-dom"


export function Navbar() {

    const { currentUser, logout } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()
    async function logoutUser(){
        try {
            await logout();
             navigate("/login")   
        } catch (error : any) {
            alert("An error occurred while logging out. Please try again.");
        }
    }

    return <>
    <div className="navbar">
        <div className="container">
            <div className="logo">
                <img src={Logo} alt="Vacations-Logo" />
            </div>
            <div className="links">
                <span>{`${currentUser?.first_name} ${currentUser?.last_name}`}</span>
                <span onClick={logoutUser} className="logout">Logout</span>
            </div>
        </div>
    </div>

    </>
}