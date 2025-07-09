/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, type SubmitHandler } from "react-hook-form";
import { addSong, updateSong, getSongsByArtist } from "../../services/song";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Song } from "../../types";

type SongFormInput = {
  name: string;
  audio: FileList;
};

export const SongForm = () => {
  const { artistId, id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SongFormInput>();
  const [, setExistingSong] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && artistId) {
      const fetchSong = async () => {
        try {
          const songs = await getSongsByArtist(artistId);
          const song = songs.find((s) => s.id === id);
          if (song) {
            setExistingSong(song);
            setValue("name", song.name);
          }
        } catch (err) {
          setError("Error al cargar la canción");
        }
      };
      fetchSong();
    }
  }, [id, artistId, setValue]);

  const onSubmit: SubmitHandler<SongFormInput> = async (data) => {
    try {
      setError(null);
      if (id && artistId) {
        await updateSong(id, data.name, artistId, data.audio[0]);
      } else if (artistId) {
        await addSong(data.name, artistId, data.audio[0]);
      }
      navigate(`/artists/${artistId}`);
    } catch (err) {
      setError(`Error al guardar canción: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Canción" : "Añadir Canción"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            {...register("name", { required: "Nombre es obligatorio" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label>Archivo MP3</label>
          <input
            type="file"
            accept="audio/mp3"
            {...register("audio", { required: !id })}
          />
          {errors.audio && <p className="error">Archivo MP3 es obligatorio</p>}
        </div>
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};