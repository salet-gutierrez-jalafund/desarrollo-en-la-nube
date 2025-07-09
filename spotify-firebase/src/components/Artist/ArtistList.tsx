import { useEffect, useState } from "react";
import { getArtistsByGenre, deleteArtist } from "../../services/artist";
import type { Artist } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useParams, Link } from "react-router-dom";

export const ArtistList = () => {
  const { genreId } = useParams();
  const [artists, setArtists] = useState<Artist[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (genreId) {
      const fetchArtists = async () => {
        const data = await getArtistsByGenre(genreId);
        setArtists(data);
      };
      fetchArtists();
    }
  }, [genreId]);

  const handleDelete = async (id: string) => {
    await deleteArtist(id);
    setArtists(artists.filter((artist) => artist.id !== id));
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Artistas</h1>
        {isAdmin && (
          <Link to={`/genres/${genreId}/artists/new`} className="add-button">
            Añadir Artista
          </Link>
        )}
      </div>
      <div className="grid">
        {artists.map((artist) => (
          <div key={artist.id} className="card">
            <img src={artist.imageUrl} alt={artist.name} />
            <h3>{artist.name}</h3>
            <Link to={`/artists/${artist.id}`}>Ver Canciones</Link>
            {isAdmin && (
              <div className="card-actions">
                <Link to={`/genres/${genreId}/artists/edit/${artist.id}`}>
                  Editar
                </Link>
                <button className="button-delete" onClick={() => handleDelete(artist.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};