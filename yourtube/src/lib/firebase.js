// src/firebase.js (or src/lib/firebase.js depending on your structure)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHldT4gTClXp3UQ4Noz_ewjLFOOdQvO_Y",
  authDomain: "yourtube-1c629.firebaseapp.com",
  projectId: "yourtube-1c629",
  storageBucket: "yourtube-1c629.appspot.com",
  messagingSenderId: "460806004012",
  appId: "1:460806004012:web:6fee4436c1d46456caa089",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
