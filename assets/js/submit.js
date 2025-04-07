import { supabase } from '../../supabaseClient.js';

document.addEventListener("DOMContentLoaded", async function () {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/login";
  }

  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const groupName = document.querySelector(".group-name-input").value.trim();
    const gdriveLink = document.querySelector(".link-input").value.trim();

    if (groupName === "" || gdriveLink === "") {
      alert("Please fill in all fields.");
      return;
    }

    const { error } = await supabase.from('submissions').insert([{
      group: groupName,
      link: gdriveLink,
      email: user.email,
      created_at: new Date()
    }]);

    if (error) {
      console.error("Error submitting data: ", error);
      alert("Submission failed. Please try again.");
    } else {
      alert("Submission successful!");
      document.querySelector(".group-name-input").value = "";
      document.querySelector(".link-input").value = "";
    }
  });

  // Rest of your dropdown filtering code remains the same...
});