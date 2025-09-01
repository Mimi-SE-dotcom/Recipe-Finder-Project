import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import { searchMealsByName } from "./services/mealdb.js";

export default function App() {
  const [query, setQuery] = useState("chicken"); // default demo search
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | empty | error
  const [error, setError] = useState("");

  const runSearch = async (q) => {
    setQuery(q);
    if (!q.trim()) {
      setMeals([]);
      setStatus("idle");
      return;
    }
    try {
      setStatus("loading");
      setError("");
      const data = await searchMealsByName(q);
      if (data.length === 0) {
        setMeals([]);
        setStatus("empty");
      } else {
        setMeals(data);
        setStatus("success");
      }
    } catch (err) {
      setMeals([]);
      setStatus("error");
      setError(err.message || "Something went wrong");
    }
  };

  // Run initial search once
  useEffect(() => {
    runSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Header */}
      <header className="text-center my-6">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Recipe Finder 🍴</h1>
          <p className="text-gray-600 mt-1">
            Search dishes by name and explore categories & cuisines from
            TheMealDB.
          </p>

          <div className="mt-6">
            <SearchBar onSearch={runSearch} initialQuery={query} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {status === "loading" && (
          <p className="text-gray-700">Searching for “{query}”…</p>
        )}
        {status === "error" && (
          <p className="text-red-600">
            Couldn’t load recipes. {error}. Please try again.
          </p>
        )}
        {status === "empty" && (
          <p className="text-gray-700">
            No recipes found for “{query}”. Try another name.
          </p>
        )}
        {status === "idle" && (
          <p className="text-gray-700">Start by typing a dish name above.</p>
        )}

        {status === "success" && (
          <section
            aria-label="Search results"
            className="grid gap-6 mt-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500">
        Data from{" "}
        <a
          className="underline"
          href="https://www.themealdb.com/"
          target="_blank"
          rel="noreferrer"
        >
          TheMealDB
        </a>
        .
      </footer>
    </div>
  );
}