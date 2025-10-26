// assets/firebase-init.js  (SIN <script> ... </script>)

// SDKs principales
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyAEOIDc1ldO0P2Y3c0vKhap0jDDM59PdFQ",
  authDomain: "matematica-a-pedal.firebaseapp.com",
  projectId: "matematica-a-pedal",
  storageBucket: "matematica-a-pedal.firebasestorage.app",
  messagingSenderId: "323411578025",
  appId: "1:323411578025:web:f6fe406953ae7fab99edb8",
  measurementId: "G-ZY88YE7ZJJ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Persistencia offline (opcional)
enableIndexedDbPersistence(db).catch(() => {});

// Login anónimo
signInAnonymously(auth).catch(console.error);

// Exponer para otros scripts
window.__MAP__ = { app, auth, db, onAuthStateChanged };
