import { supabase } from '../../supabaseClient.js';

document.querySelector('.login-btn').addEventListener('click', async function(event) {
  event.preventDefault();

  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Login error:', error.message);
    alert('Login failed: ' + error.message);
  } else {
    sessionStorage.setItem('userEmail', data.user.email);
    window.location.href = './';
  }
});

// Password toggle remains the same
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});
