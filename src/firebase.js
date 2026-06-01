import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvHV0A7vf98lLjASJT1EMAbMHwt3PITKw",
  authDomain: "distribuidora-tatto.firebaseapp.com",
  projectId: "distribuidora-tatto",
  storageBucket: "distribuidora-tatto.firebasestorage.app",
  messagingSenderId: "438212905194",
  appId: "1:438212905194:web:af5cdfdc3744f4d6f5af93"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);