/**
 * @file Login.tsx
 * @description Componente para la página de inicio de sesión. Permite autenticarse con
 * correo/contraseña, Google o Facebook. Valida el formato del correo y la longitud de la contraseña.
 */
import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * @function Login
 * @description Componente funcional que renderiza el formulario de inicio de sesión
 * y botones para autenticación con proveedores externos.
 * @returns {JSX.Element} Interfaz de inicio de sesión.
 */
const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * @function validateEmail
   * @description Valida el formato del correo electrónico usando una expresión regular.
   * @param {string} email - Correo a validar.
   * @returns {boolean} True si el correo es válido, false si no.
   */
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /**
   * @function handleEmailLogin
   * @description Maneja el inicio de sesión con correo y contraseña, incluyendo validaciones.
   * @param {FormEvent} e - Evento del formulario.
   * @returns {Promise<void>} Redirige al dashboard si tiene éxito, muestra error si falla.
   */
  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    const result = await authContext?.loginWithEmail(email, password);
    if (result) {
      setError(result);
    } else {
      navigate("/dashboard");
    }
  };

  /**
   * @function handleGoogleLogin
   * @description Inicia sesión con Google mediante Firebase.
   * @returns {Promise<void>} Redirige al dashboard si tiene éxito, muestra error si falla.
   */
  const handleGoogleLogin = async () => {
    setError("");
    const result = await authContext?.loginWithGoogle();
    if (result) {
      setError(result);
    } else {
      navigate("/dashboard");
    }
  };

  /**
   * @function handleFacebookLogin
   * @description Inicia sesión con Facebook mediante Firebase.
   * @returns {Promise<void>} Redirige al dashboard si tiene éxito, muestra error si falla.
   */
  const handleFacebookLogin = async () => {
    setError("");
    const result = await authContext?.loginWithFacebook();
    if (result) {
      setError(result);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleEmailLogin}>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button onClick={handleGoogleLogin}>Iniciar con Google</button>
      <button onClick={handleFacebookLogin}>Iniciar con Facebook</button>
    </div>
  );
};

export default Login;