import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqzp3DZmAsZrpe88ZVB-TaIPdKhnrmYC0",
  authDomain: "authappuser.firebaseapp.com",
  projectId: "authappuser",
  storageBucket: "authappuser.firebasestorage.app",
  messagingSenderId: "1071724551605",
  appId: "1:1071724551605:web:153e84951923d4225dcdfc",
  measurementId: "G-M51Y82KRXZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const analytics = getAnalytics(app);

export { auth, googleProvider, facebookProvider, analytics };