document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close all other answers
            const allAnswers = document.querySelectorAll('.faq-answer');
            const allQuestions = document.querySelectorAll('.faq-question');
            
            allAnswers.forEach(answer => {
                if(answer !== question.nextElementSibling) {
                    answer.classList.remove('show');
                }
            });
            
            allQuestions.forEach(q => {
                if(q !== question) {
                    q.classList.remove('active');
                }
            });
            
            // Toggle current answer
            const answer = question.nextElementSibling;
            answer.classList.toggle('show');
            question.classList.toggle('active');
        });
    });

    // Add language switching functionality
    const languageSelects = document.querySelectorAll('.language-select');
    
    languageSelects.forEach(select => {
        select.addEventListener('change', function() {
            const language = this.value;
            if (language === 'hi') {
                window.location.href = 'hindi.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    });

    // Set correct language option based on current page
    const currentPage = window.location.pathname;
    if (currentPage.includes('hindi.html')) {
        languageSelects.forEach(select => {
            select.value = 'hi';
        });
    } else {
        languageSelects.forEach(select => {
            select.value = 'en';
        });
    }

    // Login Form Validation and Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            // Email validation
            const email = emailInput.value.trim();
            if (!email) {
                showError(emailInput, 'Please enter a valid email or phone number.');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Password validation
            const password = passwordInput.value;
            if (!password) {
                showError(passwordInput, 'Your password must contain between 4 and 60 characters.');
                isValid = false;
            } else if (password.length < 4 || password.length > 60) {
                showError(passwordInput, 'Your password must contain between 4 and 60 characters.');
                isValid = false;
            }

            // If validation passes
            if (isValid) {
                // Store login status in localStorage (for demo purposes)
                localStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to index.html
                window.location.href = 'index.html';
                return false; // Prevent form from submitting normally
            }
        });

        // Password visibility toggle
        const passwordToggle = document.querySelector('.password-toggle');
        if (passwordToggle) {
            passwordToggle.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
    }
});

// Helper functions for form validation
function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        const div = document.createElement('div');
        div.className = 'error-message';
        input.parentElement.appendChild(div);
    }
    input.parentElement.querySelector('.error-message').textContent = message;
    input.parentElement.querySelector('.error-message').style.display = 'block';
    input.style.borderColor = '#e87c03';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

// Add this function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        window.location.href = 'index.html';
    }
} 