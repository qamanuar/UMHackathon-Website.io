// assets/js/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbOXax3HLoa66H3QfhiQmjlfNwWoU_g_k",
    authDomain: "umhackathon2025.firebaseapp.com",
    projectId: "umhackathon2025",
    storageBucket: "umhackathon2025.appspot.com",
    messagingSenderId: "856480389899",
    appId: "1:856480389899:web:b02cce20128e274962e00e",
    measurementId: "G-Z7P123YH56"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('Firebase app initialized:', app);
console.log('Firebase auth initialized:', auth);

export { auth };