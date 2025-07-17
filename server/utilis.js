import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.JWT_SECRET

const genereate_token=async(id)=>{
    const token = jwt.sign({id},secret,{expiresIn:'7 days'})
    return token;
}

export default genereate_token;

