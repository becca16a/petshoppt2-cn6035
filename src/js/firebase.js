// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD3y0Hfc45drabfiq5hBYbwMYccQrLYsUA",
  authDomain: "petshop-databasecn6035.firebaseapp.com",
  projectId: "petshop-databasecn6035",
  storageBucket: "petshop-databasecn6035.firebasestorage.app",
  messagingSenderId: "1031137912003",
  appId: "1:1031137912003:web:d59b949df3371889e3ae76",
  measurementId: "G-XKCR83NT8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);