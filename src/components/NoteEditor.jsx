import { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import TagsInput from './TagsInput';

function NoteEditor() {
  const { activeNote, setActiveNote, addNote, updateNote } = useNotes();
  const [note, setNote] = useState({ 
    title: '', 
    content: '', 
    tags: [],
    color: 'gray' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeNote) {
      setNote({
        ...activeNote,
        tags: Array.isArray(activeNote.tags) ? activeNote.tags : []
      });
    } else {
      setNote({ title: '', content: '', tags: [], color: 'gray' });
    }
  }, [activeNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const noteData = {
        ...note,
        tags: Array.isArray(note.tags) ? note.tags : []
      };

      if (activeNote) {
        await updateNote(activeNote._id, noteData);
      } else {
        await addNote(noteData);
      }
      setNote({ title: '', content: '', tags: [], color: 'gray' });
      setActiveNote(null);
    } catch (err) {
      setError('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            placeholder="Note Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            placeholder="Note Content"
            className="w-full px-4 py-2 border rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <TagsInput
            tags={note.tags}
            onChange={(tags) => setNote({ ...note, tags })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <select
            value={note.color}
            onChange={(e) => setNote({ ...note, color: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="gray">Gray</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          {activeNote && (
            <button
              type="button"
              onClick={() => setActiveNote(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : activeNote ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
