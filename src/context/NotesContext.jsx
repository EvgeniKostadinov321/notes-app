import { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTags, setSelectedTags] = useState([]);

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('hhttps://notes-app-backend-nu9n.onrender.com/api/notes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  // Add note
  const addNote = async (note) => {
    setLoading(true);
    try {
      const response = await fetch('hhttps://notes-app-backend-nu9n.onrender.com/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...note,
          tags: Array.isArray(note.tags) ? note.tags : []
        })
      });
      const data = await response.json();
      if (response.ok) {
        setNotes([data, ...notes]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`hhttps://notes-app-backend-nu9n.onrender.com/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== id));
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  // Update note
  const updateNote = async (id, updatedNote) => {
    setLoading(true);
    try {
      const response = await fetch(`hhttps://notes-app-backend-nu9n.onrender.com/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...updatedNote,
          tags: Array.isArray(updatedNote.tags) ? updatedNote.tags : []
        })
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(notes.map(note => note._id === id ? data : note));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to update note');
    } finally {
      setLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = [...notes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  // Fetch notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ 
      notes, 
      activeNote,
      setActiveNote,
      addNote, 
      deleteNote, 
      updateNote,
      loading,
      error,
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      selectedTags,
      setSelectedTags,
      filteredNotes: filterNotes()
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
