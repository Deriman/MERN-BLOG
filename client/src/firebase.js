// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-18d63.firebaseapp.com",
    projectId: "mern-blog-18d63",
    storageBucket: "mern-blog-18d63.firebasestorage.app",
    messagingSenderId: "898698256951",
    appId: "1:898698256951:web:d4b47662dd0c28c929d5b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);