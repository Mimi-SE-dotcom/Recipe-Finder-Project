import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { searchMealsByName, searchMealsByIngredient } from "../services/api";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("name"); // "name" or "ingredient"

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results =
        searchType === "name"
          ? await searchMealsByName(query)
          : await searchMealsByIngredient(query);
      setMeals(results || []);
    } catch (error) {
      console.error(error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // load a default recipe
    handleSearch("Arrabiata");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <SearchBar onSearch={handleSearch} />

        {/* Toggle search type */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Search by Name</option>
          <option value="ingredient">Search by Ingredient</option>
        </select>
      </div>

      {/* Loading state */}
      {loading && <p className="text-center text-gray-600">Loading recipes...</p>}

      {/* Recipes grid */}
      {!loading && meals.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
}