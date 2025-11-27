import { useFilm } from "../hooks/useFilm.js";

const FilmDetails = ({ id }) => {
  const { film, loading, error } = useFilm(id);

  if (loading) return <p>Loading film...</p>;
  if (error) return <p>Error: {String(error)}</p>;
  if (!film) return <p>No film found.</p>;

  return (
    <div className="film-details">
      <h3>Film Details</h3>
      <h2>{film.filmTitle}</h2>
      <p>
        <strong>Certificate:</strong> {film.filmCertificate}
      </p>
      <p>
        <strong>Stars:</strong> {film.stars}
      </p>
      <p>{film.filmDescription}</p>
    </div>
  );
};
export default FilmDetails;
