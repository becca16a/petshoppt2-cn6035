document.addEventListener('DOMContentLoaded', function() {
    // it shows the strength of the password in the signup form
    const passwordInput = document.getElementById('signupPassword');
    if(passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 1;
            // Contains numbers
            if (password.match(/\d/)) strength += 1;
            // Contains special chars
            if (password.match(/[^A-Za-z0-9]/)) strength += 1;
            // Contains uppercase
            if (password.match(/[A-Z]/)) strength += 1;
            
            // Updated UI
            const width = strength * 25;
            strengthBar.style.width = `${width}%`;
            
            if (strength <= 1) {
                strengthBar.style.backgroundColor = '#FF6B6B';
                strengthText.textContent = 'Weak';
            } else if (strength <= 3) {
                strengthBar.style.backgroundColor = 'orange';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.style.backgroundColor = '#6BCB77';
                strengthText.textContent = 'Strong';
            }
        });
    }
    
    // Form submission handlers
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const result = await authFunctions.authenticateUser(email, password);
                if (result.success) {
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed: ' + result.error);
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        });
    }
    
    const signupForm = document.getElementById('signupForm');
    if(signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirm').value;
            
            if(password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if(!document.getElementById('termsAgree').checked) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            try {
                const result = await authFunctions.registerUser(name, email, password);
                if (result.success) {
                    alert('Registration successful! Please login.');
                    window.location.href = 'login.html';
                } else {
                    alert('Registration failed: ' + result.error);
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        });
    }
    
    
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if(forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address:');
            if(email) {
                authFunctions.sendPasswordResetEmail(email)
                    .then(() => alert('Password reset email sent!'))
                    .catch(error => alert('Error: ' + error.message));
            }
        });
    }
});