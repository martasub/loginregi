document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // At least 6 characters
        return password.length >= 6;
    }

    function showError(input, message) {
        input.classList.add('error');
        input.classList.remove('success');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    function showSuccess(input) {
        input.classList.add('success');
        input.classList.remove('error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    function clearValidation(input) {
        input.classList.remove('error', 'success');
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            clearValidation(this);
        } else if (validateEmail(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Please enter a valid email address');
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            clearValidation(this);
        } else if (validatePassword(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Password must be at least 6 characters long');
        }
    });

    // Clear validation when user starts typing
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearValidation(this);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        // Validate password
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            isValid = false;
        } else {
            showSuccess(passwordInput);
        }
        
        if (isValid) {
            // Simulate login process
            const submitButton = form.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Logging in...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Check for demo credentials
                const email = emailInput.value;
                const password = passwordInput.value;
                
                // Demo: Accept the placeholder credentials or any valid format
                if (email === 'email@janesfakedomain.net' && password === 'Aa123!') {
                    alert('Login successful! Welcome back!');
                    form.reset();
                    clearValidation(emailInput);
                    clearValidation(passwordInput);
                } else if (validateEmail(email) && validatePassword(password)) {
                    alert('Login successful! (Demo mode - any valid credentials work)');
                    form.reset();
                    clearValidation(emailInput);
                    clearValidation(passwordInput);
                } else {
                    alert('Invalid credentials. Please try again.');
                }
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        }
    });

    // Navigation button functionality
    document.querySelector('.nav-button').addEventListener('click', function() {
        alert('Navigation button clicked!');
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`${this.textContent} page clicked!`);
        });
    });

    // Sign up link
    document.querySelector('.signup-link a').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Redirecting to sign up page...');
    });

    // Enhanced UX: Focus management
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Auto-focus email field when page loads
    setTimeout(() => {
        emailInput.focus();
    }, 100);
});