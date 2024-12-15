import { getConnection } from "../../db/connection"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { checkIfUserExistQuery } from "../../queries/checkIfUserExistQuery"
import { registerQuery } from "../../queries/registerQuery"




export async function register(req : Request, res : Response){
    
    const checkUserQuery = checkIfUserExistQuery()

    const connection = await getConnection()
    if (!connection) return res.status(500).send({ message: "Database connection failed" }); 

    try {
        const [data] = await connection.execute(checkUserQuery,[req.body.email])
        if (Array.isArray(data) && data.length) {
            return res.status(409).send("User already exists")
        }
        
        
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const registerQueryInsert = registerQuery()
        const values = [req.body.first_name, req.body.last_name, req.body.email, hashedPassword]

        await connection.execute(registerQueryInsert,values)
        return res.status(201).send("User has been created")
        


    } catch (err) {
        console.log("Query Error:" + err)
        return res.status(500).send("Failed to execute query")
    }
    
}

export default register
