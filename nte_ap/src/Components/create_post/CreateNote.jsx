import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNote.css";
import { toast } from 'react-toastify'

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; 


  const handleSaveNote = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newNote = {
      title,
      content,
      author,
      date: new Date(),
    };

    try {
const res = await fetch(`${API_URL}/notes`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify(newNote),
});


      if (res.ok) {
        console.log("Note saved successfully!");
        navigate("/notes");
      } else {
        console.error("Failed to save note:", await res.text());
        toast.error("Error saving note. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Unable to connect to the backend.");
    }
  };

  return (
    <div className="create-note-container">
      <div className="create-note-card">
        <h1 className="create-note-title">📝 Create a New Note</h1>

        <form className="create-note-form" onSubmit={handleSaveNote}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your note content here..."
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="submit" className="save-btn">
              💾 Save Note
            </button>
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/notes")}
            >
              ← Back to Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
