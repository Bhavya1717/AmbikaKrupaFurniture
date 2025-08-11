// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8d5Nc8IqDC6P2YjM1Lp7HX0r-_aaqFLU",
  authDomain: "ambika-55.firebaseapp.com",
  projectId: "ambika-55",
  storageBucket: "ambika-55.appspot.com",
  messagingSenderId: "311768347233",
  appId: "1:311768347233:web:9c331d1e4fbefa7e55b020",
  measurementId: "G-MS8K0ETR36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app, "https://ambika-55-default-rtdb.asia-southeast1.firebasedatabase.app/");

setPersistence(auth, browserLocalPersistence); // session saved until manual logout

export { auth, provider, firebaseConfig, database };
