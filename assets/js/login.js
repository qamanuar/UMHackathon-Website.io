import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Add event listener for login button
document.querySelector('.login-btn').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // console.log('User signed in:', userCredential.user.email);

        // Store user email in session storage
        sessionStorage.setItem('userEmail', userCredential.user.email);

        // Redirect to dashboard
        window.location.href = './';
    } catch (error) {
        console.error('Login error:', error.code, error.message);
        alert('Login failed: ' + error.message);
    }
});

// Add event listener for password toggle
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});