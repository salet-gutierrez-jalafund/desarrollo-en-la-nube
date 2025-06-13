/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../components/Button";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase/FirebaseConfig";

export const LoggedInUser = () => {
  const navigate = useNavigate();
  const { user, logout } = useFirebaseUser();
  const [userHasGoogle, setUserHasGoogle] = useState(false);
  const [userHasPassword, setUserHasPassword] = useState(false);
  const [userHasPhone, setUserHasPhone] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const hasGoogle = user.providerData.some(
      (profile) => profile.providerId === "google.com"
    );
    setUserHasGoogle(hasGoogle);
    const hasPassword = user.providerData.some(
      (profile) => profile.providerId === "password"
    );
    setUserHasPassword(hasPassword);
    const hasPhone = user.providerData.some(
      (profile) => profile.providerId === "phone"
    );
    setUserHasPhone(hasPhone);

    const fetchProfileData = async () => {
      const userDocRef = doc(firebaseDb, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log("No se encontraron datos del usuario en Firestore");
      }
    };
    fetchProfileData();
  }, [user]);

  const onAddEmailSignInClicked = () => {
    navigate("/linkpassword");
  };

  const onAddPhoneSignInClicked = () => {
    navigate("/phonecheck");
  };

  return (
    <Card>
      <div>
        <h1>¡Bienvenido al dashboard {user?.displayName}!</h1>
        <div>
          <b>Tu email es:</b> {user?.email}
        </div>
        {profileData && (
          <div>
            <p>
              <b>Dirección:</b> {profileData.address}
            </p>
            <p>
              <b>Fecha de nacimiento:</b> {profileData.birthdate}
            </p>
            <p>
              <b>Edad:</b> {profileData.age}
            </p>
          </div>
        )}
        <div>
          Agregar métodos de inicio de sesión adicionales:
          {!userHasGoogle && (
            <div>
              <Button variant="danger" className="mt-3" onClick={() => {}}>
                Agregar inicio con Google
              </Button>
            </div>
          )}
          {!userHasPassword && (
            <div>
              <Button
                variant="secondary"
                className="mt-3"
                onClick={onAddEmailSignInClicked}
              >
                Agregar inicio con email
              </Button>
            </div>
          )}
          {!userHasPhone && (
            <div>
              <Button
                variant="secondary"
                className="mt-3"
                onClick={onAddPhoneSignInClicked}
              >
                Agregar detalles de teléfono
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => {
            logout();
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </Card>
  );
};