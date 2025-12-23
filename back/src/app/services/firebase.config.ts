// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYVgFEonP6_I087pT0Q4USXkMB1GrpnDc",
  authDomain: "profile-cd57b.firebaseapp.com",
  projectId: "profile-cd57b",
  storageBucket: "profile-cd57b.firebasestorage.app",
  messagingSenderId: "65056567945",
  appId: "1:65056567945:web:1565e4167a491b0d46cc58",
  measurementId: "G-0PRMQQ440W",
  databaseURL: "https://profile-cd57b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

export default app;

