import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
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

  // Check if submit button was hidden previously
  if (localStorage.getItem('submitHidden') === 'true') {
    submitBtn.style.display = 'none';
  }

  submitBtn.addEventListener("click", async function (event) {
    event.preventDefault(); // prevent form reload

    const groupName = document.querySelector(".group-name-input").value.trim();
    const gdriveLink = document.querySelector(".link-input").value.trim();
    const domainNum = document.querySelector(".domain-input").value.trim();
    const user = auth.currentUser;

    if (groupName === "" || gdriveLink === "" || domainNum === "") {
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
        domain: domainNum,
        email: user.email,
        timestamp: new Date()
      });

      // Hide the button and store the state in localStorage
      submitBtn.style.display = "none";
      localStorage.setItem('submitHidden', 'true');  // Store the state

      // Create and show thank you message
      const thankYouMessage = document.createElement("div");
      thankYouMessage.textContent = "Thank you for submitting!";
      thankYouMessage.className = "thank-you-message";
      thankYouMessage.style.marginTop = "10px";
      thankYouMessage.style.fontWeight = "bold";
      thankYouMessage.style.color = "#FFFFFF";
      thankYouMessage.style.textAlign = "center"; // Horizontal centering

      submitBtn.parentNode.appendChild(thankYouMessage);

      // Clear form fields
      document.querySelector(".group-name-input").value = "";
      document.querySelector(".link-input").value = "";
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("Submission failed. Please try again.");
    }
  });

  // Dropdown filtering and other event listeners (same as before)
  const dropdownList = document.getElementById("dropdown_list");
  const dropdownItems = document.getElementsByClassName("dropdown_item");
  const submitGroupnameInput = document.getElementById("submit-groupname-input");

  submitGroupnameInput.addEventListener("focusin", function () {
    document.getElementById("dropdown_list").classList.add("show");
  });
  submitGroupnameInput.addEventListener("focusout", function () {
    setTimeout(() => {
      document.getElementById("dropdown_list").classList.remove("show");
    }, 200);
  });

  submitGroupnameInput.addEventListener("input", searchGroupname);

  function searchGroupname() {
    const filter = submitGroupnameInput.value.toLowerCase();
    for (let i = 0; i < dropdownItems.length; i++) {
      let item = dropdownItems[i];
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
    item.onclick = function () {
      document.getElementById("submit-groupname-input").value = item.innerHTML;
    };
  });
});
