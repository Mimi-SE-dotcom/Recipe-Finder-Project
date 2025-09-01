// src/components/RecipeDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealById } from "../services/mealdb.js";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        setLoading(true);
        const data = await getMealById(id);
        setMeal(data);
      } catch (err) {
        setMeal(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, [id]);

  if (loading)
    return <p className="p-4 text-center text-gray-700">Loading...</p>;
  if (!meal)
    return <p className="p-4 text-center text-red-600">Meal not found.</p>;

  // Extract ingredients (TheMealDB stores them in strIngredient1..20)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        ← Back to Search
      </button>

      <h1 className="text-3xl font-bold text-center">{meal.strMeal} </h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-10 object-cover rounded-lg shadow-sm"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 whitespace-pre-line">{meal.strInstructions}</p>
      </section>
    </div>
  );
}