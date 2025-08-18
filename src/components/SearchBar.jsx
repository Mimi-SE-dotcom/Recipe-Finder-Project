import { useState } from "react";

export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);

  const submit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-3xl mx-auto gap-2"
      aria-label="Search recipes by name"
    >
      <input
        type="text"
        placeholder="Search for recipes (e.g., Arrabiata)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 rounded-md border px-4 py-3 outline-none focus:ring focus:ring-indigo-200"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
      >
        Search
      </button>
    </form>
  );
}