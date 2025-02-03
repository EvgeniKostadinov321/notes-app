import { useState } from 'react';

function TagsInput({ tags, onChange }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      const newTag = input.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const colorClasses = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-green-100 text-green-800',
    important: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span
            key={tag}
            className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
              colorClasses[tag] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter)"
        className="w-full px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </div>
  );
}

export default TagsInput;
