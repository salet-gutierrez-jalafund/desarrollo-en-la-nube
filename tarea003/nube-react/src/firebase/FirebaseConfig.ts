import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCqzp3DZmAsZrpe88ZVB-TaIPdKhnrmYC0",
  authDomain: "authappuser.firebaseapp.com",
  projectId: "authappuser",
  storageBucket: "authappuser.firebasestorage.app",
  messagingSenderId: "1071724551605",
  appId: "1:1071724551605:web:153e84951923d4225dcdfc",
  measurementId: "G-M51Y82KRXZ"
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
export const firebaseUi = new firebaseui.auth.AuthUI(firebaseAuth);
export const firebaseDb = getFirestore(firebaseApp);

firebaseAuth.useDeviceLanguage();
export { firebaseAuth };
