import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import { searchMealsByName, searchMealsByIngredient } from "./services/api";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("name");
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const runSearch = async (trimmed, m = mode) => {
    try {
      setStatus("loading");
      let data = [];

      if (m === "name") {
        data = await searchMealsByName(trimmed);
      } else {
        data = await searchMealsByIngredient(trimmed);
      }

      if (!data || data.length === 0) {
        setMeals([]);
        setStatus("empty");
      } else {
        setMeals(data);
        setStatus("success");
      }
    } catch (err) {
      setMeals([]);
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (query) runSearch(query, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SearchBar
        initialQuery={query}
        mode={mode}
        onModeChange={(m) => setMode(m)}
        onSearch={(q) => {
          setQuery(q);
          runSearch(q);
        }}
      />

      {/* States */}
      <div className="mt-6">
        {status === "loading" && (
          <p className="text-gray-700">
            Searching for “{query}” by {mode}…
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600">
            Couldn’t load recipes. {error}. Please try again.
          </p>
        )}
        {status === "empty" && (
          <p className="text-gray-700">
            No recipes found for “{query}”. Try another {mode}.
          </p>
        )}
        {status === "idle" && (
          <p className="text-gray-700">
            Start by typing a dish name or ingredient above.
          </p>
        )}
      </div>

      {/* Grid */}
      {status === "success" && (
        <section
          aria-label="Search results"
          className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </section>
      )}
    </div>
  );
}