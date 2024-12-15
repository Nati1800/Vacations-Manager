import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import bodyParser from 'body-parser'
import vacationsRouter from './vacations'
import authRouter from './auth'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'

dotenv.config()

if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is missing from environment variables.");
}


const app = express()

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

app.use(limiter)


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5800", 
        credentials: true,
}))
app.use(cookieParser())
// app.use(bodyParser.json())



app.use("/healthCheck",(req,res,next)=>{
    res.status(200).send("Api Is Working")
})


app.use("/auth", authRouter)

app.use("/vacations",vacationsRouter)



app.listen(process.env.PORT ,()=>{
    console.log(`Api working on port ${process.env.PORT}`)
})

export default app