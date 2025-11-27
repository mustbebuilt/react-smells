import { useState } from "react";
import { ApiClient } from "../services/ApiClient";

export function useDeleteFilm(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteFilm(id) {
    setLoading(true);
    setError(null);

    try {
      await ApiClient.deleteFilm(id);
      if (onSuccess) onSuccess(id);   // parent can update state
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { deleteFilm, loading, error };
}
