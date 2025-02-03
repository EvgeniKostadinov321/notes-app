import Note from '../models/Note.js';

// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, tags = [], color = 'gray' } = req.body;
    const note = await Note.create({
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      color,
      user: req.userId
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, color } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      { 
        title, 
        content, 
        tags: Array.isArray(tags) ? tags : [],
        color 
      },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

// Get a single note
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note' });
  }
};
