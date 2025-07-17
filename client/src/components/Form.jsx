import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'

function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // UPDATE existing note
      axios.put(`http://localhost:8000/api/notes/${editId}`, {
        title,
        description
      }).then((res) => {
        const updatedNote = res.data.data;
        setNotes(notes.map(n => n._id === editId ? updatedNote : n));
        resetForm();
      }).catch((err) => console.log("Update error:", err.message));
    } else {
      // CREATE new note
      axios.post('http://localhost:8000/api/notes', {
        title,
        description
      }).then((res) => {
        setNotes([...notes, res.data.data]);
        resetForm();
      }).catch((err) => console.log("Create error:", err.message));
    }
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(n => n._id !== id));
      })
      .catch((err) => console.log("Delete error:", err.message));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/notes')
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
      });
  }, []);

  return (
    <>
      <h2>{editId ? "Edit Note" : "Add Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          required
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Submit"}</button>
        {editId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>: {note.description}
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Form;
