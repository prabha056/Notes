import NoteModel from '../models/notemodel.js'

const createNotes = async(req,res)=>{
  try{
      const {title,description} = req.body;
    const newNote = new NoteModel({
        title,description
    })
    const savedUser = await newNote.save()
    return res.status(200).json({success:true,data:savedUser})
  }
  catch(err){
    return res.status(500).json({success:false,data:err.message})
  }
}

const getNotes = async(req,res)=>{
    try{
        const get_notes = await NoteModel.find()
        return res.status(201).json({success:true,data:get_notes})
    }
    catch(err){
    return res.status(500).json({success:false,data:err.message})
  }
}


const getNotesById = async(req,res)=>{
    try{
        const get_notes_id = await NoteModel.findById(req.params.id)
        return res.status(201).json({success:true,data:get_notes_id})
    }
    catch(err){
    return res.status(500).json({success:false,data:err.message})
  }
}

const updateNotes = async(req,res)=>{
    try{
        const update_notes = await NoteModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(201).json({success:true,data:update_notes})
    }
    catch(err){
    return res.status(500).json({success:false,data:err.message})
  }
}

const deleteNotes = async(req,res)=>{
    try{
        const delete_notes = await NoteModel.findByIdAndDelete(req.params.id)
        return res.status(201).json({success:true,data:"Delete Note Successfully"})
    }
    catch(err){
    return res.status(500).json({success:false,data:err.message})
  }
}

export {createNotes,getNotes,getNotesById,updateNotes,deleteNotes}