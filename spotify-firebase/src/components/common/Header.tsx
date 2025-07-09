import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Logout } from "../Auth/Logout";
import spotifyIcon from "../../assets/spotify-icon.png";
import { useState } from "react";

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={spotifyIcon} alt="Spotify Logo" className="logo-icon" />
          <h1 className="logo-text">Spotify</h1>
        </div>
        <nav>
          <Link to="/genres">Géneros</Link>
          {user ? (
            <>
              {isAdmin && (
                <>
                  <Link to="/genres/new">Añadir Género</Link>
                </>
              )}
              <div className="user-menu">
                <span className="user-info" onClick={togglePopup}>
                  {user.displayName || user.email}
                  <span className="arrow-down">▼</span>
                </span>
                {isPopupOpen && (
                  <div className="user-popup">
                    <Logout onClose={() => setIsPopupOpen(false)} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};