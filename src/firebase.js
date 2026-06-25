import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA1gFxGX5KF7VUw9KLRKk_gMSVOj17swQk",
  authDomain: "waveparty-cfbf0.firebaseapp.com",
  databaseURL: "https://waveparty-cfbf0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "waveparty-cfbf0",
  storageBucket: "waveparty-cfbf0.firebasestorage.app",
  messagingSenderId: "259204053371",
  appId: "1:259204053371:web:4b07c9dad75f0498c1e5de",
  measurementId: "G-FGHDZBMS8P"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);