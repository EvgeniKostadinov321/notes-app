import { useState } from 'react';
import { useNotes } from '../context/NotesContext';

function NoteCard({ note }) {
  const { deleteNote, setActiveNote } = useNotes();
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    gray: 'bg-gray-50 border-gray-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200'
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteNote(note._id);
    setIsDeleting(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return `${content.slice(0, maxLength)}...`;
  };

  return (
    <>
      <div 
        className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border ${colorClasses[note.color] || colorClasses.gray}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {note.title}
          </h3>
          <div className="relative">
            <p className="text-gray-600">
              {isExpanded ? note.content : truncateContent(note.content)}
            </p>
            {note.content.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-600 mt-2 text-sm font-medium"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {note.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className={`mt-4 flex justify-end space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={() => setActiveNote(note)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={() => setIsExpanded(true)}
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Full View
            </button>
          </div>
        </div>
        <div className="px-4 py-2 bg-opacity-50 text-sm text-gray-500">
          {formatDate(note.createdAt)}
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setIsExpanded(false)}>
          <div className={`max-w-2xl w-full bg-white rounded-lg shadow-xl ${colorClasses[note.color] || colorClasses.gray}`} onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{note.content}</p>
              </div>
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {note.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteCard;
