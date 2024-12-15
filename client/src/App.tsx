// import './App.css'
import {
createBrowserRouter,
RouterProvider,
Outlet,
useNavigate,
useLocation
 } from "react-router-dom"
import { RegisterPage } from './components/Pages/Register';
import { LoginPage } from './components/Pages/Login';
import { Navbar } from './components/Navbar/navbar';
import { VacationsPage } from './components/Pages/Vacations';
import "./style.scss"
import { AdminVacationPage } from "./components/Pages/Admin";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "./components/Context/authContext";
import { AddNewVacationPage } from "./components/Pages/AddNewVacation";
import { EditVacationPage } from "./components/Pages/EditVacation";
import { VacationChartPage } from "./components/Pages/VacationChartReport";


function Layout(){
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "admin" && location.pathname === "/vacations") {
        navigate("/vacations/admin");
      }
    }
  }, [currentUser, location.pathname]);
  return (
    <>
    <Navbar/>
    <Outlet/>
     </>
  )
}


const router = createBrowserRouter([
  {
    path: "/vacations",
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children:[{
      path : "/vacations",
      element: <ProtectedRoute requiredRole="regular"><VacationsPage/></ProtectedRoute>
    },
    {
      path: "/vacations/admin",
      element: <ProtectedRoute requiredRole="admin"><AdminVacationPage/></ProtectedRoute>
    }
    ]
  },
  {
    path: "/add/admin",
    element: <ProtectedRoute requiredRole="admin"><AddNewVacationPage/></ProtectedRoute>,
  },
  {
    path: "/edit/admin",
    element: <ProtectedRoute requiredRole="admin"><EditVacationPage/></ProtectedRoute>,
  },
  {
    path: "/chart/admin",
    element: <ProtectedRoute requiredRole="admin"><VacationChartPage/></ProtectedRoute>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  
]);


function App() {
  
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )

}

export default App
