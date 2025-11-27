import React from "react";
import { useFilms } from "../hooks/useFilms.js";
import FilmDetails from "./FilmDetails.jsx";
const FilmsPage = () => {
  const { films, loading, error } = useFilms();
  const [selectedFilm, setSelectedFilm] = React.useState(null);

  if (error) return <p>Error: {String(error)}</p>;
  if (loading) return <p>Loading films...</p>;

  return (
    <div className="films-page">
      <div className="films-list">
        <h3>All Films</h3>
        <ul>
          {films.map((f) => (
            <li key={f.filmID}>
              <a
                href="#"
                onClick={(ev) => {
                  ev.preventDefault(); // stops page jump
                  setSelectedFilm(f.filmID);
                }}
              >
                {" "}
                {f.filmTitle}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {selectedFilm && <FilmDetails id={selectedFilm} />}
      {!selectedFilm && <p>Please select a film to see details.</p>}

     
    </div>
  );
};
export default FilmsPage;
