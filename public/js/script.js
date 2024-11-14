document.addEventListener("DOMContentLoaded", function() {
    const allButtons = document.querySelectorAll(".searchBtn");
    const searchBar = document.querySelector(".searchBar");
    const searchInput = document.getElementById("searchInput");
    const searchClose = document.querySelector(".searchClose");
    
    allButtons.forEach(button => {
        button.addEventListener("click", function() {
            searchBar.style.visibility = "visible";
            searchBar.classList.add("open");
            this.setAttribute("aria-expanded", "true");
            searchInput.focus();
        });
    });
    
    searchClose.addEventListener("click", function() {
        searchBar.style.visibility = "hidden";
        searchBar.classList.remove("open");
        searchClose.setAttribute("aria-expanded", "false");
    });
});
  
function togglePassword(id) {
    let passwordField = document.getElementById(id);
    let icon = passwordField.nextElementSibling.querySelector("i");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
