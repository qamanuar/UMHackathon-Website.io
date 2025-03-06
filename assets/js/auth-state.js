import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
  const loggedInSection = document.getElementById('logged-in');
  const loggedInSubmission = document.getElementById('logged-in-submission');
  const loggedOutSection = document.getElementById('logged-out');
  const logoutButton = document.getElementById('logout-btn');
  const userEmail = document.getElementById('user-email');
  const signOutButton = document.getElementById('sign-out-button');

  // Function to update UI based on authentication state
  function updateUI(user) {
    if (user) {
      // User is signed in
      loggedInSection.classList.remove('d-none');
      loggedInSubmission.classList.remove('d-none');
      logoutButton.classList.remove('d-none');
      loggedOutSection.classList.add('d-none');
      userEmail.textContent = user.email; // Display user's email
    } else {
      // User is signed out
      loggedInSection.classList.add('d-none');
      loggedInSubmission.classList.add('d-none');
      logoutButton.classList.add('d-none');
      loggedOutSection.classList.remove('d-none');
    }
  }

  // Listen for authentication state changes
  auth.onAuthStateChanged((user) => {
    updateUI(user);
  });

  // Sign out functionality
  signOutButton.addEventListener('click', async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log('User signed out successfully');
      window.location.href = 'index.html'; // Redirect to the homepage
    } catch (error) {
      console.error('Sign out error:', error.message);
      alert('Sign out failed: ' + error.message);
    }
  });
});