import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

document.querySelector('.login-btn').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.querySelector('.email-input').value;
    const password = document.querySelector('.pswd-input').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user.email);
        
        // Navigate to dashboard
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Login error:', error.code, error.message);
        alert('Login failed: ' + error.message);
    }
});
