// src/firebase.js (or src/lib/firebase.js depending on your structure)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGeOGhdvYgqita7PBz-9mLIrJJFySOdLo",
  authDomain: "main-fd6fb.firebaseapp.com",
  projectId: "main-fd6fb",
  storageBucket: "main-fd6fb.firebasestorage.app",
  messagingSenderId: "60263208947",
  appId: "1:60263208947:web:b92407b9490d263fb3e486",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
