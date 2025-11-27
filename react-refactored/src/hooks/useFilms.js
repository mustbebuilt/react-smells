import { ApiClient } from "../services/Apiclient";
import React from "react";
const useFilms = () => {
  const [films, setFilms] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    ApiClient.getAllFilms()
      .then((data) => mounted && setFilms(data))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return { films, loading, error };
};
export { useFilms };
