import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // TODO: Replace with your actual Firebase config keys
  apiKey: "AIzaSyBY4IpnbZn3jZLMzL_8SWpePR1UlA_EgZ0",
  authDomain: "portfoliodual.firebaseapp.com",
  projectId: "portfoliodual",
  storageBucket: "portfoliodual.firebasestorage.app",
  messagingSenderId: "521764097990",
  appId: "1:521764097990:web:908a174d6fe7fb5a8decc7",
  measurementId: "G-WV44CQN93D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;