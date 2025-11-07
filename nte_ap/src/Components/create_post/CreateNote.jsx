import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNote.css";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSaveNote = (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      alert("Please fill in all fields.");
      return;
    }

    // In a real app, you'd send this to your backend
    const newNote = {
      title,
      content,
      author,
      date: new Date(),
    };

    console.log("New Note Created:", newNote);

    // Redirect to notes page (could also pass the note data via state or API)
    navigate("/notes");
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
