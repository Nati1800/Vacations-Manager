import { getConnection } from "../../db/connection"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { checkIfUserExistQuery } from "../../queries/checkIfUserExistQuery"
import { RowDataPacket } from "mysql2"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface User extends RowDataPacket{
    id : number
    first_name : string
    last_name: string
    email : string
    password : string
    role : string
}

export async function login(req : Request, res : Response){
    
    const checkUserQuery = checkIfUserExistQuery()

    const connection = await getConnection()
    if (!connection) return res.status(500).send({ message: "Database connection failed" });  

    try {
        const [data] = await connection.execute<User[]>(checkUserQuery,[req.body.email])

        if (Array.isArray(data) && data.length === 0) {
            return res.status(404).send("User Not Found")
        }

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if(!checkPassword) return res.status(400).send("Wrong Username Or Password")


        const token = jwt.sign({id : data[0].id, role : data[0].role}, process.env.JWT_KEY as string)

        const {password, ...others} = data[0]

        res.cookie("accessToken",token,{
            httpOnly : true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "lax",
        }).status(200).json({...others})
        
        
    } catch (err) {
        console.log("Query Error:" + err)
        return res.status(500).send("Failed To Execute Query")
    }
    
}

export default login