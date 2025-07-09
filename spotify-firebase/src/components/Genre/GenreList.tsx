import { useEffect, useState } from "react";
import { getGenres, deleteGenre } from "../../services/genre";
import type { Genre } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { logViewGenre } from "../../services/firebase";

export const GenreList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres();
      setGenres(data);
      logViewGenre("all_genres");
    };
    fetchGenres();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteGenre(id);
    setGenres(genres.filter((genre) => genre.id !== id));
  };

  return (
    <div className="container">
      <h1>Géneros</h1>
      <div className="grid">
        {genres.map((genre) => (
          <div key={genre.id} className="card">
            <img src={genre.imageUrl} alt={genre.name} />
            <h3>{genre.name}</h3>
            <Link to={`/genres/${genre.id}`}>Ver Artistas</Link>
            {isAdmin && (
              <div className="card-actions">
                <Link to={`/genres/edit/${genre.id}`}>Editar</Link>
                <button className="button-delete" onClick={() => handleDelete(genre.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};