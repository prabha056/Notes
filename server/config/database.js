import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectdb = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Db is Connected Successfully")
    })
    .catch((err)=>{
        console.log("Db is not connected")
    })
}

export default connectdb;