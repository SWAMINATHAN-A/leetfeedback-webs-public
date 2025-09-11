import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAh8vnF_XgP9VAEV0pqdTJlR9S3oZaaSWs",
  authDomain: "leetfeedback.firebaseapp.com",
  projectId: "leetfeedback",
  storageBucket: "leetfeedback.appspot.com",
  messagingSenderId: "387157583759",
  appId: "1:387157583759:web:66eb97b6acc880679f0dfa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Log to verify Firebase is initialized
console.log("Firebase initialized successfully", app.name);

// Configure Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

export default app;
