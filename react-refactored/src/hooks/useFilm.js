import { ApiClient } from "../services/Apiclient";
import React from "react";
export function useFilm(id) {
  const [film, setFilm] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    ApiClient.getFilm(id)
      .then((data) => mounted && setFilm(data))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  return { film, loading, error };
}
