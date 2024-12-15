
import express, { Request, Response } from "express"
import { getVacations } from "./handlers/getVacations"
import { authenticateUser } from "../middleware/authUser";
import { followVacation } from "./handlers/followVacation";
import { unFollowVacation } from "./handlers/unfollowVacation";
import { authorizeAdmin } from "../middleware/authAdmin";
import { deleteVacation } from "./handlers/deleteVacation";
import { addVacation } from "./handlers/addVacation";
import { editVacation } from "./handlers/editVacation";
import { getVacationsForChart } from "./handlers/getVacationsChart";

const vacationsRouter = express.Router()

vacationsRouter.get("/",async (req : Request,res : Response)=>{
    
    try {
        const { followed, new: isNew, active } = req.query;
        const token = req.cookies?.accessToken;
        
        if (!token) {
            return res.status(401).json({ error: "Authorization token is required" });
          }
      
          const data = await getVacations(
            {
              followed: followed === "true",
              new: isNew === "true",
              active: active === "true",
            },
            token
          );
        res.json(data)
    } catch (error) {
        console.error("Error fetching vacations:", error);
        res.status(500).json({ error: "Failed to fetch vacations" });
    }
})


vacationsRouter.post("/follow", authenticateUser, followVacation);

vacationsRouter.post("/unfollow",authenticateUser,unFollowVacation)

vacationsRouter.delete("/delete/:id",authenticateUser,authorizeAdmin, deleteVacation)

vacationsRouter.post("/add", authenticateUser, authorizeAdmin, addVacation)

vacationsRouter.put("/edit/:id", authenticateUser, authorizeAdmin, editVacation)

vacationsRouter.get("/report",authenticateUser,authorizeAdmin,async (req : Request,res : Response)=>{
    
    try {
       const data = await getVacationsForChart()
         res.json(data)
    } catch (error) {
        console.error("Error fetching vacations:", error);
        res.status(500).json({ error: "Failed to fetch vacations" });
    }
})


export default vacationsRouter

