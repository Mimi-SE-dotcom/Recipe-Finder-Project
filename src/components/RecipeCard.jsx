import { Link } from "react-router-dom";
export default function RecipeCard({ meal }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 line-clamp-1">{meal.strMeal}</h2>

        {/* Short description */}
        {meal.strInstructions && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {meal.strInstructions}
          </p>
        )}

        {/* Details button */}
        <Link
          to={`/recipe/${meal.idMeal}`}
          className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}