/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      navigate("/genres");
    } catch (err) {
      setError("Error al registrarse");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            {...register("name", { required: "Nombre es obligatorio" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email es obligatorio" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "Contraseña es obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};