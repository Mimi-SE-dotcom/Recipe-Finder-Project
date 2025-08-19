export default function RecipeCard({ meal }) {
  const { strMealThumb, strMeal, strCategory, strArea } = meal;

  return (
    <article className="rounded-lg border shadow-sm overflow-hidden bg-white">
      <img
        src={strMealThumb}
        alt={strMeal}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{strMeal}</h3>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Category:</span> {strCategory || "—"}
          {" · "}
          <span className="font-medium">Cuisine:</span> {strArea || "—"}
        </p>
        {/* Hook up navigation later to a details page */}
        {/* <Link to={`/recipe/${meal.idMeal}`} className="mt-3 inline-block text-indigo-600 hover:underline">View details</Link> */}
      </div>
    </article>
  );
}