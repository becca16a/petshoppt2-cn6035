// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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