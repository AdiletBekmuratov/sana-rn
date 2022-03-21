// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGet4FCUzk02cTaQEuYj7sUnp5-DoO5xM",
  authDomain: "predictor-200c0.firebaseapp.com",
  databaseURL:
    "https://predictor-200c0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "predictor-200c0",
  storageBucket: "predictor-200c0.appspot.com",
  messagingSenderId: "575184074444",
  appId: "1:575184074444:web:bc1b921bdc1e197c4af469",
  measurementId: "G-8HHPMS2NX4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)
