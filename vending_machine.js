document.addEventListener("DOMContentLoaded", function() {
    let inputEl = document.querySelector(".input-box input[type='password']");
    let closedPadlockIcon = document.getElementById("padlock-icon");
    let openPadlockIcon = document.getElementById("open-padlock-icon");

    closedPadlockIcon.style.color = "#9b9b9b";
    openPadlockIcon.style.color = "#34c759";

    openPadlockIcon.classList.add("hide");

    closedPadlockIcon.addEventListener("click", () => {
        inputEl.type = "text";
        closedPadlockIcon.classList.add("hide");
        openPadlockIcon.classList.remove("hide");
    });

    openPadlockIcon.addEventListener("click", () => {
        inputEl.type = "password";
        openPadlockIcon.classList.add("hide");
        closedPadlockIcon.classList.remove("hide");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let loginForm = document.getElementById("login-form");
    let registerForm = document.getElementById("register-form");
    let showRegister = document.getElementById("show-register");
    let showLogin = document.getElementById("show-login");

    showRegister.addEventListener("click", function(event) {
        event.preventDefault();
        loginForm.classList.add("hide");
        registerForm.classList.remove("hide");
    });

    showLogin.addEventListener("click", function(event) {
        event.preventDefault();
        registerForm.classList.add("hide");
        loginForm.classList.remove("hide");
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = registerForm.querySelector("input[type='text']").value;
        let email = registerForm.querySelector("input[type='email']").value;
        let password = registerForm.querySelector("input[type='password']").value;

        if (username && email && password) {
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let userExists = users.some(user => user.username === username);
            if (userExists) {
                alert("Username already exists. Please choose another.");
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! You can now log in.");
            registerForm.reset();
            registerForm.classList.add("hide");
            loginForm.classList.remove("hide");
        } else {
            alert("Please fill in all fields.");
        }
    });

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
});
