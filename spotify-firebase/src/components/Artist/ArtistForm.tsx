import { useForm, type SubmitHandler } from "react-hook-form";
import { addArtist, updateArtist, getArtistsByGenre } from "../../services/artist";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Artist } from "../../types";

type ArtistFormInput = {
  name: string;
  image: FileList;
};

export const ArtistForm = () => {
  const { genreId, id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ArtistFormInput>();
  const [, setExistingArtist] = useState<Artist | null>(null);

  useEffect(() => {
    if (id && genreId) {
      const fetchArtist = async () => {
        const artists = await getArtistsByGenre(genreId);
        const artist = artists.find((a) => a.id === id);
        if (artist) {
          setExistingArtist(artist);
          setValue("name", artist.name);
        }
      };
      fetchArtist();
    }
  }, [id, genreId, setValue]);

  const onSubmit: SubmitHandler<ArtistFormInput> = async (data) => {
    try {
      if (id && genreId) {
        await updateArtist(id, data.name, genreId, data.image[0]);
      } else if (genreId) {
        await addArtist(data.name, genreId, data.image[0]);
      }
      navigate(`/genres/${genreId}`);
    } catch (err) {
      console.error("Error al guardar artista:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Artista" : "Añadir Artista"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            {...register("name", { required: "Nombre es obligatorio" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: !id })}
          />
          {errors.image && <p className="error">Imagen es obligatoria</p>}
        </div>
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};