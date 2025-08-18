// Simple wrapper around TheMealDB search endpoint
export async function searchMealsByName(query) {
  const q = (query || "").trim();
  if (!q) return []; // no blank calls
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // The API will returns { meals: null } when no results
  return data.meals || [];
}