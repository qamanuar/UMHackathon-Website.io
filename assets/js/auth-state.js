import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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