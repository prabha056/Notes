
import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const NoteModel = mongoose.model('Note',noteSchema)

export default NoteModel;