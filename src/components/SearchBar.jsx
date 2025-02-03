import { useState } from 'react';

function SearchBar({ onSearch, onSort }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex-shrink-0">
        <select
          onChange={(e) => onSort(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
