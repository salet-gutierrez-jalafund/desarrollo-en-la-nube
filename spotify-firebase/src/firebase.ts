import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWsSGDzG9p6vwhH6Y55KKr4XW5Iu9X9QE",
  authDomain: "proyectospotify-14312.firebaseapp.com",
  projectId: "proyectospotify-14312",
  storageBucket: "proyectospotify-14312.firebasestorage.app",
  messagingSenderId: "306142655362",
  appId: "1:306142655362:web:71207180bcb6f53a9c959b",
  measurementId: "G-1MNV4RXD08"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const analytics = getAnalytics(app);

export { auth, googleProvider, facebookProvider, analytics };