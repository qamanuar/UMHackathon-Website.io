import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

import firebaseConfig from './firebase-keys.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
