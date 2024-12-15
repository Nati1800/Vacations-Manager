import { Request, Response } from "express";
import { getConnection } from "../../db/connection";
import { deleteVacationQuery } from "../../queries/deleteVacationQuery";


export async function deleteVacation(req : Request, res : Response) {
    const vacationId = parseInt(req.params.id)
    if (isNaN(vacationId) ||  vacationId < 0) {
        return res.status(400).json({ message: "Invalid vacation ID" });
    }
    
    const connection = await getConnection();
    if (!connection) return res.status(500).send({ message: "Database connection failed" });

    try {
        const query = deleteVacationQuery();
        await connection.execute(query, [vacationId]);
        return res.status(200).send({ message: "Vacation deleted successfully" });

    } catch (error) {
        console.error("Error deleting vacation:", error);
        return res.status(500).send({ message: "Failed to delete vacation" });
    }
}