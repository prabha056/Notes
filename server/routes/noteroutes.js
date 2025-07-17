import {createNotes,getNotes,getNotesById,updateNotes,deleteNotes} from '../controllers/notecontroller.js'
import express from 'express'

const notesRouter = express.Router()

notesRouter.route('/notes')
.post(createNotes)
.get(getNotes)

notesRouter.route('/notes/:id')
.get(getNotesById)
.put(updateNotes)
.delete(deleteNotes)

export default notesRouter;