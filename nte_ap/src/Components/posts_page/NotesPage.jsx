import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotesPage.css";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      
  const navigate = useNavigate();

  // ✅ Fetch notes function
  const getNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes");
      if (!response.ok) throw new Error("Failed to fetch notes");

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect just calls the async function
  useEffect(() => {
    getNotes();
  }, []);

  const handleCreateNote = () => navigate("/create-note");

  // ✅ Loading / Error UI
  if (loading) return <p className="loading">Loading notes...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1 className="page-title">📝 My Notes</h1>
        <button className="create-btn" onClick={handleCreateNote}>
          ➕ Create Note
        </button>
      </div>

      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-card">
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
