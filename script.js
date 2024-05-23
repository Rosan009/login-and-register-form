document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    showRegisterFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle login form submission
    loginForm.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost/login-register-app/backend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('login-error-message').innerText = 'Login successful!';
                // Redirect or perform actions upon successful login
            } else {
                document.getElementById('login-error-message').innerText = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('login-error-message').innerText = 'An error occurred during login.';
        });
    });

    // Handle registration form submission
    registerForm.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const email = document.getElementById('register-email').value;

        fetch('http://localhost/login-register-app/backend/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ username, password, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                document.getElementById('login-error-message').innerText = 'Registration successful! Please login.';
            } else {
                document.getElementById('register-error-message').innerText = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('register-error-message').innerText = 'An error occurred during registration.';
        });
    });
});
