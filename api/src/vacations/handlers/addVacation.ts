import { Request, Response } from "express";
import { getConnection } from "../../db/connection";
import { addVacationQuery } from "../../queries/addVacationQuery";


export async function addVacation(req : Request, res : Response) {
    
    const connection = await getConnection();
    if (!connection) return res.status(500).send({ message: "Database connection failed" });

    try {
        const query = addVacationQuery();
        const values = [
            req.body.destination,
            req.body.description,
            req.body.start_date,
            req.body.end_date,
            req.body.price,
            req.body.image
        ]
        if (!req.body.destination || !req.body.description || !req.body.description || !req.body.description
             || !req.body.description || !req.body.description) 
             {
                return res.status(400).send({ message : "Missing Vacation Inputs"})
        }
        await connection.execute(query, values);
        return res.status(201).send({ message : "Vacation has been created"})

    } catch (error) {
        console.error("Error adding vacation:", error);
        return res.status(500).send({ message: "Failed to add vacation" });
    }
}