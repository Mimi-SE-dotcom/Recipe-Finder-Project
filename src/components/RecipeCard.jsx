export default function RecipeCard({ meal }) {
  // Destructure safely with defaults
  const { strMealThumb, strMeal, strCategory, strArea, strInstructions } = meal || {};

  return (
    <article className="rounded-lg border shadow-sm overflow-hidden bg-white max-w-xs mx-auto">
      <img
        src={strMealThumb || ""}
        alt={strMeal || "Recipe image"}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{strMeal || "No title"}</h3>

        {/* Safe short instructions */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {strInstructions ? strInstructions.slice(0, 120) + "…" : "No description available."}
        </p>

        {/* Optional Category / Cuisine */}
        <p className="text-xs text-gray-500 mt-1">
          <span className="font-medium">Category:</span> {strCategory || "—"} •{" "}
          <span className="font-medium">Cuisine:</span> {strArea || "—"}
        </p>

        {/* Optional View Recipe button */}
        {meal?.idMeal && (
          <a
            href={`/recipe/${meal.idMeal}`}
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            View Recipe →
          </a>
        )}
      </div>
    </article>
  );
}