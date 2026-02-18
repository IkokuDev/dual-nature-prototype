import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY4IpnbZn3jZLMzL_8SWpePR1UlA_EgZ0",
  authDomain: "portfoliodual.firebaseapp.com",
  projectId: "portfoliodual",
  storageBucket: "portfoliodual.firebasestorage.app",
  messagingSenderId: "521764097990",
  appId: "1:521764097990:web:908a174d6fe7fb5a8decc7",
  measurementId: "G-WV44CQN93D"
};

// Initialize Firebase
console.log("[FIREBASE DIAG] Initializing Firebase with project:", firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
console.log("[FIREBASE DIAG] Firebase app initialized:", app.name);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

console.log("[FIREBASE DIAG] Firestore instance created for project:", db.app.options.projectId);

// Diagnostic: Test raw read from 'posts' collection
(async () => {
  try {
    console.log("[FIREBASE DIAG] Testing raw read from 'posts' collection...");
    const snap = await getDocs(collection(db, "posts"));
    console.log("[FIREBASE DIAG] Raw 'posts' count:", snap.size);
    snap.docs.forEach(doc => {
      const data = doc.data();
      console.log("[FIREBASE DIAG] Doc:", doc.id, "| side:", data.side, "| category:", data.category, "| title:", data.title);
    });
    if (snap.size === 0) {
      console.warn("[FIREBASE DIAG] ⚠️ The 'posts' collection is EMPTY. No documents found.");
    }
  } catch (err) {
    console.error("[FIREBASE DIAG] ❌ Failed to read 'posts' collection:", err);
  }
})();

export default app;