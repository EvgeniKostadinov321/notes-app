function NoteForm() {
  return (
    <form className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Note Title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <textarea
          placeholder="Note Content"
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Save Note
      </button>
    </form>
  );
}

export default NoteForm;
