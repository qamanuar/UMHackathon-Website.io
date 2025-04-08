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

// window.addEventListener("scroll", () => {
//     console.log("Scrolling detected! Y:", window.scrollY);
// });

document.querySelector(".go-top").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector(".go-top");

    if (!backToTopButton) return; // Prevent errors if button doesn't exist

    const showOnPx = 400;

    // Show/hide button on scroll
    document.addEventListener("scroll", () => {
        if ( window.scrollY> showOnPx) {
            backToTopButton.classList.remove("hidden");
        } else {
            backToTopButton.classList.add("hidden");
        }
    });

    // Click to scroll smoothly to top
    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
