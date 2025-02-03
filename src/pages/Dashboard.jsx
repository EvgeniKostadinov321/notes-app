import { useNotes } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';
import SearchBar from '../components/SearchBar';
import TagsInput from '../components/TagsInput';

function Dashboard() {
  const { 
    filteredNotes, 
    loading, 
    error, 
    setSearchTerm, 
    setSortBy,
    selectedTags,
    setSelectedTags 
  } = useNotes();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Notes</h1>
        <NoteEditor />
      </div>

      <div className="mb-8">
        <SearchBar 
          onSearch={setSearchTerm}
          onSort={setSortBy}
        />
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Filter by Tags</h3>
          <TagsInput 
            tags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <NoteCard key={note._id} note={note} />
        ))}
        {filteredNotes.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No notes found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
