import { Request, Response } from "express";
import { getConnection } from "../../db/connection";
import { editVacationQuery } from "../../queries/editVacationQuery";



export async function editVacation(req : Request, res : Response) {
    
    const connection = await getConnection();
    if (!connection) return res.status(500).send({ message: "Database connection failed" });

    try {

        const vacationId = req.params.id 
        if (!vacationId) {
            return res.status(400).send({ message: "Vacation ID is required" });
        }

        const { destination, description, start_date, end_date, price, image } = req.body;
        if (!destination || !description || !start_date || !end_date || !price || !image) {
            return res.status(400).send({ message: "All vacation fields are required" });
        }

        const query = editVacationQuery()
        
        const values = [ destination, description, start_date, end_date, price, image, vacationId ]

        await connection.execute(query,values);
        return res.status(200).send({ message : "Vacation has been edited"})

    } catch (error) {
        console.error("Error editing vacation:", error);
        return res.status(500).send({ message: "Failed to edit vacation" });
    }
}