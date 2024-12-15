import express from "express"
import register from "./handlers/register"
import login from "./handlers/login"
import logout from "./handlers/logout"

const authRouter = express.Router()

authRouter.get("/",async (req,res,next)=>{
    try {
        res.send("auth")
    } catch (error) {
        res.status(400).send("Bad Request")
        console.log("Error: " + error)
    }
})

authRouter.post("/register",async (req,res,next)=>{
    try {
        await register(req, res)
    } catch (error) {
        res.status(500).send("Register Failed: " + error)
        
    }
})

authRouter.post("/login",async (req,res,next)=>{
    try {
        await login(req, res)
    } catch (error) {
        res.status(500).send("Login Failed: " + error) 
    }
})

authRouter.post("/logout",async (req,res,next)=>{
    try {
        await logout(req, res)
    } catch (error) {
        res.status(500).send("Logout Failed: " + error) 
    }
})


// function extractUser(body : any) {
//     const { first_name, last_name, email, password } = body;
//     return { first_name, last_name, email, password }
// }

export default authRouter