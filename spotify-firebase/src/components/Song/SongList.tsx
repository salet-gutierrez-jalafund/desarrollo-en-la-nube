import { useEffect, useState } from "react";
import { getSongsByArtist, deleteSong } from "../../services/song";
import type { Song } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import { logPlaySong } from "../../services/firebase";
import musicIcon from "../../assets/music.png";

export const SongList = () => {
  const { artistId } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (artistId) {
      const fetchSongs = async () => {
        const data = await getSongsByArtist(artistId);
        setSongs(data);
      };
      fetchSongs();
    }
  }, [artistId]);

  const handleDelete = async (id: string) => {
    await deleteSong(id);
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Canciones</h1>
        {isAdmin && (
          <Link to={`/artists/${artistId}/songs/new`} className="add-button">
            Añadir Canción
          </Link>
        )}
      </div>
      <div>
        {songs.map((song) => (
          <div key={song.id} className="song-card">
            <div className="song-content">
              <img src={musicIcon} alt="Music Icon" className="song-icon" />
              <div className="song-details">
                <h3>{song.name}</h3>
                <audio controls src={song.audioUrl} onPlay={() => logPlaySong(song.id)} />
              </div>
            </div>
            {isAdmin && (
              <div className="card-actions">
                <Link to={`/artists/${artistId}/songs/edit/${song.id}`}>Editar</Link>
                <button className="button-delete" onClick={() => handleDelete(song.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};