// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db } from '../../firebase-config.js';



// Redirect to login page if user is not signed in
auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "/login";
    }
});
  
  // Form submission handling
document.addEventListener("DOMContentLoaded", async function () {
    const submitBtn = document.querySelector(".submit-btn");
    
    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent page reload
        
        const groupName = document.querySelector(".group-name-input").value.trim();
        const gdriveLink = document.querySelector(".link-input").value.trim();
        const user = auth.currentUser; // Get the logged-in user
        
        if (groupName === "" || gdriveLink === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (!user) {
            alert("User not authenticated.");
            return;
        }
        
        try {
            await addDoc(collection(db, "submissions"), {
                group: groupName,
                link: gdriveLink,
                email: user.email, // Save user's email
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


    const dropdownList = document.getElementById("dropdown_list");
    const dropdownItems = document.getElementsByClassName("dropdown_item");
    const submitGroupnameInput = document.getElementById("submit-groupname-input");

    // // Get group names from Firestore Database and add to dropdown list
    // try{
    //     const docRef = collection(db, "groups_names");
    //     const docSnap = await getDocs(docRef);
    //     docSnap.forEach((doc) => {
    //         const groupName = doc.data().group;
    //         const dropdownItem = document.createElement("div");
    //         dropdownItem.className = "dropdown_item";
    //         dropdownItem.textContent = groupName;
    //         dropdownList.appendChild(dropdownItem);
    //     });
    // } catch (e) {
    //     console.error("Error getting group names: ", e);
    // }
    

    // Show dropdown list when input is focused, hide when input is not focused
    submitGroupnameInput.addEventListener("focusin", function() {
        document.getElementById("dropdown_list").classList.add("show");
    });
    submitGroupnameInput.addEventListener("focusout", function() {
        setTimeout(() => {
            document.getElementById("dropdown_list").classList.remove("show");
        }
        , 200);
    });

    // Filter groupnames in dropdown list
    submitGroupnameInput.addEventListener("input", searchGroupname);
    function searchGroupname() {
        const filter = submitGroupnameInput.value.toLowerCase();
        for (let i = 0; i < dropdownItems.length; i++) {
            let item  = dropdownItems[i];
            let txtValue = item.textContent || item.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    }

    // Select groupname from dropdown list
    Array.from(dropdownItems).forEach(item => {
        item.onclick = function() {
            document.getElementById("submit-groupname-input").value = item.innerHTML;
        }
    });

});