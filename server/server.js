import express from 'express'
import dotenv from 'dotenv'
import connectdb from './config/database.js'
import notesRouter from './routes/noteroutes.js'
import userRoute from './routes/userroutes.js'
import cors from 'cors'
dotenv.config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
const PORT = process.env.PORT

connectdb();

app.get('/',(req,res)=>{
    res.send("Node Server")
})

//notes

app.use('/api',notesRouter)

//users
app.use('/api',userRoute)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
