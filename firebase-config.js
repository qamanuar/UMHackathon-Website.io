// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import * as dotenv from 'dotenv';

dotenv.config();
// Import the Firebase configuration from firebase-keys.js
// import firebaseConfig from './firebase-keys.js';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY, 
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);                // Firebase Authentication
const db = getFirestore(app);             // Firestore Database

// console.log('Firebase app initialized:', app);
// console.log('Firebase auth initialized:', auth);

export { app, auth, db };