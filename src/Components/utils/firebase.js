// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBaGwDW7ZvFX2gZfWN-gBabBARvVYXQti4",
  authDomain: "netflixgpt-e0716.firebaseapp.com",
  projectId: "netflixgpt-e0716",
  storageBucket: "netflixgpt-e0716.firebasestorage.app",
  messagingSenderId: "322378193868",
  appId: "1:322378193868:web:3fdb338b71ac40f7c09b69",
  measurementId: "G-G1VWDQB2N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();