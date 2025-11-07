import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotesPage.css";

const NotesPage = ({ notes }) => {
  const navigate = useNavigate(); // ✅ navigation hook

  const handleCreateNote = () => {
    navigate("/create-note"); // redirect to create note page
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1 className="page-title">📝 My Notes</h1>
        <button className="create-btn" onClick={handleCreateNote}>
          ➕ Create Note
        </button>
      </div>

      <div className="notes-grid">
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="note-card">
              <h2 className="note-title">{note.title}</h2>
              <p className="note-content">{note.content}</p>
              <div className="note-meta">
                <span>✍️ {note.author}</span>
                <span>📅 {new Date(note.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes">No notes available yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
