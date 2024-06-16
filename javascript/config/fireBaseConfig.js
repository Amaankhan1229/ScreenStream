// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAJfuqzIiZu-6JPo-aIWcapmqfCq2-p58U",
  authDomain: "netflix-e50c0.firebaseapp.com",
  projectId: "netflix-e50c0",
  storageBucket: "netflix-e50c0.appspot.com",
  messagingSenderId: "644304960391",
  appId: "1:644304960391:web:eb5f80a2d1737b96947122",
  measurementId: "G-CB1ERRW5VN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth();

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword};