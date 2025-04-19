import { collection, addDoc, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { auth, db } from '../../firebase-config.js';
import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";


  document.addEventListener("DOMContentLoaded", async function () {

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }
      
      const submitBtn = document.querySelector(".submit-btn");

      // Check hasSubmitted from Firestore
      const hasSubmittedRef = doc(db, "hasSubmitted", user.uid);
      const docSnap = await getDoc(hasSubmittedRef);

      if (docSnap.exists() && docSnap.data().submitted === true) {
        window.location.href = "/submitted";

        // // Hide button and show thank you
        // submitBtn.style.display = "none";

        // const thankYouMessage = document.createElement("div");
        // thankYouMessage.textContent = "Thank you for submitting!";
        // thankYouMessage.className = "thank-you-message";
        // thankYouMessage.style.marginTop = "10px";
        // thankYouMessage.style.fontWeight = "bold";
        // thankYouMessage.style.color = "#FFFFFF";
        // thankYouMessage.style.textAlign = "center";

        // submitBtn.parentNode.appendChild(thankYouMessage);
        // return;
      }

      // Allow submission if not submitted yet
      submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        const groupName = document.querySelector(".group-name-input").value.trim();
        const gdriveLink = document.querySelector(".link-input").value.trim();
        const domainNum = document.querySelector(".domain-input").value.trim();

        if (groupName === "" || gdriveLink === "" || domainNum === "") {
          alert("Please fill in all fields.");
          return;
        }

        try {
          // Submit to "submissions" collection
          await addDoc(collection(db, "submissions"), {
            group: groupName,
            link: gdriveLink,
            domain: domainNum,
            email: user.email,
            timestamp: new Date()
          });

          // Mark as submitted in hasSubmitted collection
          await setDoc(hasSubmittedRef, {
            submitted: true,
            email: user.email,
            timestamp: new Date()
          });

          // Hide the button and store state
          // submitBtn.style.display = "none";
          localStorage.setItem('submitHidden', 'true');
 
          const submitForm = document.getElementById("submitForm");
          const submitted = document.getElementById("submitted");
          const tickAnimation = document.getElementById("tick-animation");

          submitForm.classList.add("d-none");
          submitted.classList.remove("d-none");
          
          const lottieAnimation = document.createElement("canvas");
          lottieAnimation.id = "lottie-animation";
          tickAnimation.appendChild(lottieAnimation);

          new DotLottie({
            autoplay: true,
            loop: false,
            canvas: document.getElementById("lottie-animation"),
            src: "https://lottie.host/986e923e-ace0-424b-8554-c626b2fc1464/axpQpkya0p.lottie", // Replace with your animation URL
          });

          // const thankYouMessage = document.createElement("div");
          // thankYouMessage.textContent = "Thank you for submitting!";
          // thankYouMessage.className = "thank-you-message";
          // thankYouMessage.style.marginTop = "10px";
          // thankYouMessage.style.fontWeight = "bold";
          // thankYouMessage.style.color = "#FFFFFF";
          // thankYouMessage.style.textAlign = "center";
          // submitBtn.parentNode.appendChild(thankYouMessage);

          // Clear form fields
          document.querySelector(".group-name-input").value = "";
          document.querySelector(".link-input").value = "";
          document.querySelector(".domain-input").value = "";
        } catch (error) {
          console.error("Error submitting data: ", error);
          alert("Submission failed. Please try again.");
        }
      });

      // Rest of your dropdown filtering logic
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

      submitGroupnameInput.addEventListener("input", function () {
        const filter = submitGroupnameInput.value.toLowerCase();
        for (let i = 0; i < dropdownItems.length; i++) {
          let item = dropdownItems[i];
          let txtValue = item.textContent || item.innerText;
          item.style.display = txtValue.toLowerCase().includes(filter) ? "" : "none";
        }
      });

      Array.from(dropdownItems).forEach(item => {
        item.onclick = function () {
          document.getElementById("submit-groupname-input").value = item.innerHTML;
        };
      });
    });
  });
