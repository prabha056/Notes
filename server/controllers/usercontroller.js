import UserModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import generate_token from '../utilis.js'
import bcrypt from 'bcryptjs'



const signup = async (req, res) => {
  try {
    const { name, email, phone, profession, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new UserModel({
      name,
      email,
      phone,
      profession,
      password: hashedPassword
    });

    // Save user
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = await generate_token(savedUser._id);

    return res.status(201).json({ success: true, data: savedUser, signupToken: token });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


const login = async(req,res)=>{
try{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).json("User is not Found")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json("Invalid Credentials")
    }
    const token =await generate_token(user._id)

    return res.status(200).json({success:true,data:user,loginToken:token})
}
catch(err){
        return res.status(500).json({success:false,data:err.message})
}
}

const getUsers = async(req,res)=>{
    try{
        const get_allusers = await UserModel.find()
        return res.status(201).json({success:true,data:get_allusers})
    }
    catch(err){
        return res.status(500).json({success:false,data:err.message})
    }
}

const getUsersById = async(req,res)=>{
    try{
        const get_alluserId = await UserModel.findById(req.params.id)
        return res.status(201).json({success:true,data:get_alluserId})
    }
    catch(err){
        return res.status(500).json({success:false,data:err.message})
    }
}

const updateUser = async(req,res)=>{
    try{
        const update_user = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(201).json({success:true,data:update_user})
    }
    catch(err){
        return res.status(500).json({success:false,data:err.message})
    }
}

const deleteUser = async(req,res)=>{
    try{
        const delete_user = await UserModel.findByIdAndDelete(req.params.id)
        return res.status(201).json({success:true,data:"User Delete Successfully"})
    }
    catch(err){
        return res.status(500).json({success:false,data:err.message})
    }
}


export {signup,login,getUsers,getUsersById,updateUser,deleteUser}
