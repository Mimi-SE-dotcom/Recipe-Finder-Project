import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function RecipeDetails({ meal, status, error }) {
  const ingredients = useMemo(() => {
    if (!meal) return [];
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const item = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (item) list.push(`${item}${measure ? ` - ${measure}` : ""}`);
    }
    return list;
  }, [meal]);

  if (status === "loading") return <p className="text-gray-700">Loading…</p>;
  if (status === "error") return <p className="text-red-600">{error}</p>;
  if (status === "empty") return <p className="text-gray-700">Recipe not found.</p>;

  return (
    <article className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full rounded-xl border"
        />
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Category:</span> {meal.strCategory || "—"}</p>
          <p><span className="font-medium">Cuisine:</span> {meal.strArea || "—"}</p>
          {meal.strTags && (
            <p><span className="font-medium">Tags:</span> {meal.strTags}</p>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Back to search
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold mt-2">{meal.strMeal}</h1>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {ingredients.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <p className="whitespace-pre-line mt-2 leading-7">{meal.strInstructions}</p>
        </section>

        {meal.strYoutube && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Video</h2>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg border"
                src={`https://www.youtube.com/embed/${new URL(meal.strYoutube).searchParams.get("v")}`}
                title={meal.strMeal}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
    </article>
  );
}   