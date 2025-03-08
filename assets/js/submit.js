// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db } from './firebase-config.js';

// Commented out the firebase below because db can be imported from firebase-config.js for easier management

// const firebaseConfig = {
//     apiKey: "AIzaSyAwlBov2rDNX5rOlxQsEwGstTl8HA8gh2M",
//     authDomain: "umhackathon2025.firebaseapp.com",
//     databaseURL: "https://umhackathon2025-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "umhackathon2025",
//     storageBucket: "umhackathon2025.firebasestorage.app",
//     messagingSenderId: "856480389899",
//     appId: "1:856480389899:web:b02cce20128e274962e00e",
//     measurementId: "G-Z7P123YH56"
//   };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Redirect to login page if user is not signed in, prevent user from accessing this page while not logged in
auth.onAuthStateChanged((user) => {
  if(!user) {
      window.location.href = "/login";
  }
});

// Form submission handling
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".submit-btn");
    
    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent page reload
        
        const groupName = document.querySelector(".group-name-input").value.trim();
        const gdriveLink = document.querySelector(".link-input").value.trim();
        
        if (groupName === "" || gdriveLink === "") {
            alert("Please fill in all fields.");
            return;
        }
        
        try {
            await addDoc(collection(db, "submissions"), {
                group: groupName,
                link: gdriveLink,
                timestamp: new Date()
            });
            alert("Submission successful!");
            document.querySelector(".group-name-input").value = "";
            document.querySelector(".link-input").value = "";
        } catch (error) {
            console.error("Error submitting data: ", error);
            alert("Submission failed. Please try again.");
        }
    });
});
