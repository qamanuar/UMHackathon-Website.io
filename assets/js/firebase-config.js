// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Import the Firebase configuration from firebase-keys.js
// import firebaseConfig from './firebase-keys.js';

const firebaseConfig = {
    apiKey: "AIzaSyAwlBov2rDNX5rOlxQsEwGstTl8HA8gh2M",
    authDomain: "umhackathon2025.firebaseapp.com",
    databaseURL: "https://umhackathon2025-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "umhackathon2025",
    storageBucket: "umhackathon2025.firebasestorage.app",
    messagingSenderId: "856480389899",
    appId: "1:856480389899:web:b02cce20128e274962e00e",
    measurementId: "G-Z7P123YH56"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('Firebase app initialized:', app);
console.log('Firebase auth initialized:', auth);

export { app, auth };