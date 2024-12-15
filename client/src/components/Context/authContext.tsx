import axios from "axios";
import { createContext, useEffect, useState } from "react";
import apiUrl from "../ApiUrl";





type inputs = {
        email : string,
        password : string
    }


export type AuthContextType = {
    currentUser: any;
    login: (inputs: inputs) => Promise<void>;
    logout: () => Promise<void>;
  }

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({children}: { children: React.ReactNode })=>{
    const storedUser = localStorage.getItem("user");
    const [currentUser, setCurrentUser] = useState(
      storedUser ? JSON.parse(storedUser) : null
    );

    const apiURL = apiUrl();

    
    const login = async(inputs : inputs) =>{
        
            const response = await axios.post(`${apiURL}/auth/login`,inputs,{
                    withCredentials: true,
            });
            if (response.status === 200) {
              setCurrentUser(response.data);
              return response.data
            }
    }

    const logout = async()=>{
        try {
            
            const response = await axios.post(
              `${apiURL}/auth/logout`, 
              {},                     
              {
                withCredentials: true, 
              }
            );
        
            if (response.status === 200) {
              
              setCurrentUser(null);
            }
          } catch (error) {
            console.error("Error during logout:", error);
          }
    }

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
          } else {
            localStorage.removeItem("user");
          }
    }, [currentUser])
    

 


       return (
        <AuthContext.Provider value={{currentUser,login, logout}}>
            {children}
            </AuthContext.Provider>
       )
}