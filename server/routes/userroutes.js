import {signup,login,getUsers,getUsersById,updateUser,deleteUser} from '../controllers/usercontroller.js'
import express from 'express'

const userRoute = express.Router()

userRoute.post('/user/signup',signup)
userRoute.post('/user/login',login)
userRoute.get('/user',getUsers)


userRoute.route('/user/:id')
.get(getUsersById)
.put(updateUser)
.delete(deleteUser)

export default userRoute;