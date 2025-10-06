document.addEventListener('DOMContentLoaded', function () {
    const continueButton = document.getElementById('continueButton');
    const modalContainer = document.getElementById('reg-app-modal-container');
    const formContainer = document.getElementById('reg-app-content');

    const registrationForm = document.getElementById("reg-app-form");
    const fullNameInput = document.getElementById('reg-app-fullName');
    const emailInput = document.getElementById('reg-app-email');
    const passwordInput = document.getElementById('reg-app-password');
    const confirmPasswordInput = document.getElementById('reg-app-confirmPassword');

    const fullNamePattern = /^[A-Za-z]{2,}(\s[A-Za-z]{2,})+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;


    const showError = (input, message) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.style.border = "1px solid #FF5555";
        }
    };

    const clearError = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = "";
            input.style.border = "";
        }
    };

    const validateForm = () => {
        let isValid = true;

        clearError(fullNameInput);
        clearError(emailInput);
        clearError(passwordInput);
        clearError(confirmPasswordInput);

        if (!fullNamePattern.test(fullNameInput.value.trim())) {
            showError(fullNameInput, "Your first and last names (letters only).");
            isValid = false;
        }

        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        const passwordValue = passwordInput.value;
        if (!passwordPattern.test(passwordValue)) {
            showError(passwordInput, "Use min 8 characters, 1 number & 1 Uppercase.");
            isValid = false;
        }

        const confirmValue = confirmPasswordInput.value;
        if (confirmValue.trim() === '') {
            showError(confirmPasswordInput, "Confirmation password is required.");
            isValid = false;
        } else if (confirmValue !== passwordValue) {
            showError(confirmPasswordInput, "Passwords do not match.");
            isValid = false;
        }

        return isValid;
    };

    continueButton.addEventListener('click', function () {
        modalContainer.style.display = 'flex';
    });

    modalContainer.addEventListener('click', function (event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', function () {
            validateForm();
        });
    });

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            const successMessage = `
                        <div style="padding: 25px; border-radius: 8px; background-color: #00BB8F; color: white; text-align: center; margin-top: 20px;">
                            <p style="font-weight: 700; font-size: 18px;">Registration Successful!</p>
                            <p style="font-size: 14px; margin-top: 5px;">Welcome, ${fullNameInput.value}.</p>
                        </div>
                    `;

            formContainer.innerHTML = successMessage;

            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } else {
            console.error("Form submission blocked due to validation errors.");
        }
    });
});