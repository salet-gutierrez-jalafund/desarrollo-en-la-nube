/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/genres");
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/genres");
    } catch (err) {
      setError("Error con Google");
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("password", { required: "Contraseña es obligatoria" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button type="submit">Iniciar Sesión</button>
        <button type="button" onClick={handleGoogleLogin}>Iniciar con Google</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};