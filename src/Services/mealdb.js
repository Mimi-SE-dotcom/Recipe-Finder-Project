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

// New: fetch meal by ID
export async function getMealById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}