document.addEventListener("DOMContentLoaded", function() {
    let loginForm = document.getElementById("login-form");
    let homePage = document.getElementById("home-page");
    let logoutBtn = document.getElementById("logout-btn");

    // ✅ LOGIN PROCESS
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let username = loginForm.querySelector("input[type='text']").value;
            let password = loginForm.querySelector("input[type='password']").value;
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let validUser = users.find(user => user.username === username && user.password === password);

            if (validUser) {
                localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                alert("Login successful!");
                window.location.href = "home.html";
            } else {
                alert("Invalid username or password.");
            }
        });
    }

    // ✅ HOME PAGE HANDLING
    if (homePage) {
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            alert("No user found. Please log in.");
            window.location.href = "vending_machine.html";
            return;
        }

        loggedInUser = JSON.parse(loggedInUser);

        document.getElementById("username").textContent = "Welcome, " + loggedInUser.username;
        document.getElementById("profile-pic").src = loggedInUser.profilePic || "default.jpg";
    }

    // ✅ LOGOUT FUNCTION
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("loggedInUser");
            alert("You have been logged out.");
            window.location.href = "vending_machine.html";
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    let menuBtn = document.getElementById("menu-btn");
    let menuList = document.getElementById("menu-list");

    menuBtn.addEventListener("click", function() {
        if (menuList.style.display === "block") {
            menuList.style.display = "none";
        } else {
            menuList.style.display = "block";
        }
    });

    document.addEventListener("click", function(event) {
        if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
            menuList.style.display = "none";
        }
    });
});
