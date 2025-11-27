export const ApiClient = (() => {
  const BASE = "https://www.mustbebuilt.co.uk/SHU/films-api/api.php";

  async function getAllFilms() {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    return res.json();
  }

  async function getFilm(id) {
    const res = await fetch(`${BASE}?filmID=${id}`);
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    return res.json();
  }

  async function createFilm(film) {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(film),
    });
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    return res.json();
  }

  async function updateFilm(film) {
    const res = await fetch(BASE, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(film),
    });
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    return res.json();
  }

  async function deleteFilm(id) {
    const res = await fetch(`${BASE}?filmID=${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Network error: ${res.status}`);
    return res.json();
  }

  return { getAllFilms, getFilm, createFilm, updateFilm, deleteFilm };
})();
