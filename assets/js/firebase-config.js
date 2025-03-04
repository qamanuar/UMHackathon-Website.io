// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Import the Firebase configuration from firebase-keys.js
import firebaseConfig from './firebase-keys.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('Firebase app initialized:', app);
console.log('Firebase auth initialized:', auth);

export { auth };