import { useState } from "react";
import { Search } from "lucide-react"; // icon library

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md bg-white rounded-full shadow-md overflow-hidden"
    >
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        className="flex-1 px-4 py-2 outline-none text-gray-700 text-center"
      />

      {/* Button */}
      <button
        type="submit"
        className="px-4 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}