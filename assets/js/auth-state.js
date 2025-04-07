import { supabase } from '../../supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loggedInSection = document.getElementById('logged-in');
  const loggedInSubmission = document.getElementById('logged-in-submission');
  const loggedOutSection = document.getElementById('logged-out');
  const logoutButton = document.getElementById('logout-btn');
  const userEmail = document.getElementById('user-email');
  const signOutButton = document.getElementById('sign-out-button');

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    updateUI(user);
  }

  function updateUI(user) {
    if (user) {
      loggedInSection.classList.remove('d-none');
      loggedInSubmission.classList.remove('d-none');
      logoutButton.classList.remove('d-none');
      loggedOutSection.classList.add('d-none');
      userEmail.textContent = user.email;
    } else {
      loggedInSection.classList.add('d-none');
      loggedInSubmission.classList.add('d-none');
      logoutButton.classList.add('d-none');
      loggedOutSection.classList.remove('d-none');
    }
  }

  checkAuth();

  supabase.auth.onAuthStateChange((event, session) => {
    updateUI(session?.user);
  });

  signOutButton.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Sign out failed: ' + error.message);
    } else {
      console.log('User signed out successfully');
      window.location.href = './';
    }
  });
});
