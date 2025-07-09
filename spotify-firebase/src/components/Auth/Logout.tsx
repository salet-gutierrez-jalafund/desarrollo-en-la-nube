import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

type LogoutProps = {
  onClose: () => void;
};

export const Logout = ({ onClose }: LogoutProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
    navigate("/login");
  };

  return <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>;
};