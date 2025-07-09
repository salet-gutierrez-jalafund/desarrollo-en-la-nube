import { useForm, type SubmitHandler } from "react-hook-form";
import { addGenre, updateGenre, getGenres } from "../../services/genre";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Genre } from "../../types";

type GenreFormInput = {
  name: string;
  image: FileList;
};

export const GenreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<GenreFormInput>();
  const [, setExistingGenre] = useState<Genre | null>(null);

  useEffect(() => {
    if (id) {
      const fetchGenre = async () => {
        const genres = await getGenres();
        const genre = genres.find((g) => g.id === id);
        if (genre) {
          setExistingGenre(genre);
          setValue("name", genre.name);
        }
      };
      fetchGenre();
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<GenreFormInput> = async (data) => {
    try {
      if (id) {
        await updateGenre(id, data.name, data.image[0]);
      } else {
        await addGenre(data.name, data.image[0]);
      }
      navigate("/genres");
    } catch (err) {
      console.error("Error al guardar género:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Género" : "Añadir Género"}</h2>
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