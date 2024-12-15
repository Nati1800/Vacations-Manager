import { Request, Response } from "express";
import { getConnection } from "../../db/connection";
import { AuthCustomRequest } from "../../types/authTokenCustomRequest";
import { followVacationQuery } from "../../queries/followVacationQuery";



export async function followVacation(req: AuthCustomRequest, res: Response) {
    const { vacationId } = req.body; 
    const userId = req.user?.id; 

    if (!vacationId || !userId) {
        return res.status(400).send({ message: "Vacation ID and user ID are required" });
    }

    const connection = await getConnection();
    if (!connection) return res.status(500).send({ message: "Database connection failed" });

    try {
        const query = followVacationQuery();
        await connection.execute(query, [userId, vacationId]);

        return res.status(200).send({ message: "Vacation followed successfully" });
    } catch (error) {
        console.error("Error following vacation:", error);
        return res.status(500).send({ message: "Failed to follow vacation" });
    }
}   