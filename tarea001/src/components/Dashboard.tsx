/**
 * @file Dashboard.tsx
 * @description Componente para el panel de usuario. Muestra los proveedores vinculados
 * y permite vincular/desvincular proveedores (correo/contraseña, Google, Facebook).
 * Solo accesible para usuarios autenticados.
 */
import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * @function Dashboard
 * @description Componente funcional que renderiza el panel de usuario con opciones
 * para vincular/desvincular proveedores y cerrar sesión.
 * @returns {JSX.Element} Interfaz del panel de usuario.
 */
const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
   * @function handleLinkEmail
   * @description Vincula una cuenta de correo/contraseña al usuario actual.
   * @param {FormEvent} e - Evento del formulario.
   * @returns {Promise<void>} Muestra mensaje de éxito o error según el resultado.
   */
  const handleLinkEmail = async (e: FormEvent) => {
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
    const result = await authContext?.linkWithEmail(email, password);
    if (result) {
      setError(result);
    } else {
      alert("Correo/contraseña vinculado exitosamente");
      setEmail("");
      setPassword("");
    }
  };

  /**
   * @function handleLinkGoogle
   * @description Vincula una cuenta de Google al usuario actual.
   * @returns {Promise<void>} Muestra mensaje de éxito o error según el resultado.
   */
  const handleLinkGoogle = async () => {
    setError("");
    const result = await authContext?.linkGoogle();
    if (result) {
      setError(result);
    } else {
      alert("Google vinculado exitosamente");
    }
  };

  /**
   * @function handleLinkFacebook
   * @description Vincula una cuenta de Facebook al usuario actual.
   * @returns {Promise<void>} Muestra mensaje de éxito o error según el resultado.
   */
  const handleLinkFacebook = async () => {
    setError("");
    const result = await authContext?.linkFacebook();
    if (result) {
      setError(result);
    } else {
      alert("Facebook vinculado exitosamente");
    }
  };

  /**
   * @function handleUnlink
   * @description Desvincula un proveedor del usuario actual.
   * @param {string} providerId - ID del proveedor a desvincular.
   * @returns {Promise<void>} Muestra mensaje de éxito o error según el resultado.
   */
  const handleUnlink = async (providerId: string) => {
    setError("");
    const result = await authContext?.unlinkProvider(providerId);
    if (result) {
      setError(result);
    } else {
      alert(`Proveedor ${providerId} desvinculado exitosamente`);
    }
  };

  /**
   * @function handleLogout
   * @description Cierra la sesión del usuario y redirige a la página de inicio de sesión.
   * @returns {Promise<void>} Redirige a /login tras cerrar sesión.
   */
  const handleLogout = async () => {
    setError("");
    await authContext?.logout();
    navigate("/login");
  };

  const providers = authContext?.user?.providerData.map((provider) => provider.providerId) || [];

  return (
    <div className="container">
      <h2>Bienvenido, {authContext?.user?.email}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Proveedores vinculados:</h3>
      <ul>
        {providers.map((provider) => (
          <li key={provider}>
            {provider === "password" ? "Correo/contraseña" : provider}{" "}
            <button onClick={() => handleUnlink(provider)}>Desvincular</button>
          </li>
        ))}
      </ul>
      {!providers.includes("password") && (
        <div>
          <h3>Vincular con Correo/Contraseña</h3>
          <form onSubmit={handleLinkEmail}>
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
            <button type="submit">Vincular Correo/Contraseña</button>
          </form>
        </div>
      )}
      {!providers.includes("google.com") && (
        <button onClick={handleLinkGoogle}>Vincular Google</button>
      )}
      {!providers.includes("facebook.com") && (
        <button onClick={handleLinkFacebook}>Vincular Facebook</button>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;