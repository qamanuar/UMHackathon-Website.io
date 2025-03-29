//responsive tabs for mentor section
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const mentorLists = document.querySelectorAll(".mentor-list");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Remove 'active' class from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            // Hide all mentor lists
            mentorLists.forEach(list => list.classList.remove("active"));

            // Show the selected mentor list
            const targetId = this.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });
});