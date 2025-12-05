import express from "express";
import Note from "../models/Note.js";

const router = express.Router();
 
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newNote = new Note({
      title,
      content,
      author,
      date: new Date(),
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error("Error creating note:", err.message);
    res.status(500).json({ error: "Failed to create note" });
  }
});
 
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ date: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});
 
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
});
 
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});
 
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
