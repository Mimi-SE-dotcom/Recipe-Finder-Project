import { Link } from "react-router-dom";

function RecipeCard({ meal }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {meal.strMeal}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {meal?.strInstructions || "No description available."}
        </p>
        <Link
          to={`/recipe/${meal.idMeal}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;