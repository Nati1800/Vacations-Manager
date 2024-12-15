import { Request, Response } from "express"


export async function logout(req : Request, res : Response){
    try {
        const token = req.cookies?.accessToken;
        
        if (!token) {
            return res.status(400).send("User is already logged out or session expired.");
        }

        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none",
        }).status(200).send("User has been logged out");
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).send("Failed to log out user.");
    }
    
}

export default logout