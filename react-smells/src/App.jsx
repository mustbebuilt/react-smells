import React, { useState, useEffect } from "react";
import "./App.css";

export default function AppBad() {
  const [films, setFilms] = useState([]);
  const [selected_Film, setSelected_Film] = useState(null);
  const [loading, setLoading] = useState(false);
  const [FilmLoading, setFilmLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const BASE = "https://www.mustbebuilt.co.uk/SHU/films-api/api.php";

  useEffect(() => {
    setLoading(true);
    fetch(BASE)
      .then((r) => r.json())
      .then((data) => {
        setFilms(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // FIX: if selected_Film is already an object, stop loading
    if (selected_Film && typeof selected_Film === "object") {
      setFilmLoading(false);
      return; // don't fetch again
    }

    // original smelly behaviour
    // if (selectedFilm && typeof selectedFilm === "number") {
      setFilmLoading(true);

      fetch(`${BASE}?filmID=${selected_Film}`)
        .then((r) => r.json())
        .then((film) => {
          setFilmLoading(false);
          setSelected_Film(film); // smelly: overwrite ID with full object
          document.title = film.filmTitle; // smelly DOM manipulation
        });
    // }
  }, [selected_Film]);
  function renderFilmDetails() {
    if (!selected_Film) return <p>Select a film</p>;
    if (FilmLoading) return <p>Loading film...</p>;

    const f = selected_Film; // smelly: assume object

    return (
      <div>
        <h2>{f.filmTitle}</h2>
        <p>Certificate: {f.filmCertificate}</p>
        <p>Stars: {f.stars}</p>
        <p>{f.filmDescription}</p>
      </div>
    );
  }

  function deleteFilm(id) {
    fetch(`${BASE}?filmID=${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then(() => {
        const newFilms = films.filter((x) => x.filmID !== id);
        setFilms(newFilms);
        setSelected_Film(null);
      });
  }

  return (
    <div className="container">
      <h1>Films Browser (Smelly Version)</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flexGrow:0, flexShrink:0 }}>
          <h3>All Films</h3>
          {loading ? (
            <p>Loading films...</p>
          ) : (
            <ul style={{listStyle: "none", padding:0}}>
              {films.map((f) => (
                <li key={f.filmID}>
                  <a href=""
                    onClick={(ev) => {
                      ev.preventDefault();
                      setSelected_Film(f.filmID); // smelly: reused for ID & object
                    }}
                  >
                    {f.filmTitle}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Film Details</h3>
          {renderFilmDetails()}
        </div>
      </div>
    </div>
  );
}
