function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPswdForm = document.querySelector("#forgotPswd"); 


    document.querySelector("#linkCreatAccount").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        forgotPswdForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkSignIn").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPswdForm.classList.add("form--hidden");
    });
    
    document.querySelector("#linkForgotPswd").addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Forgot password link clicked");
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPswdForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkResetSignIn").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPswdForm.classList.add("form--hidden");
    });
    
    forgotPswdForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        // Perform AJAX/Fetch reset password
    
        // For demonstration purposes, simulate a success message
        setFormMessage(forgotPswdForm, "success", "Password reset instructions sent to your email.");
    });

    const countryDropdown = document.querySelector("#country");
    const stateDropdown = document.querySelector("#state");

    countryDropdown.addEventListener("change", (e) => {
        const selectedCountry = e.target.value;
        populateStates(selectedCountry);
    });

    function populateStates(country) {
        // Clear existing options
        stateDropdown.innerHTML = '<option value="" selected disabled>Select State</option>';

        // Define states for each country
        const states = {
            "UK": ["England", "Scotland", "Wales", "Northern Ireland"],
            "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Australian Capital Territory", "Northern Territory"],
            "USA": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        };

        // Populate dropdown with corresponding states
        if (states.hasOwnProperty(country)) {
            states[country].forEach(state => {
                const option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                stateDropdown.appendChild(option);
            });
        } else {
            const option = document.createElement("option");
            option.textContent = "No states available";
            stateDropdown.appendChild(option);
        }
    }

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "password" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Password must be at least 8 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(e.target);
        });

    });
});
    const backButton = document.querySelector("#forgotPswd .form__button--back");
    backButton.addEventListener("click", () => {
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
    forgotPswdForm.classList.add("form--hidden");
});

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Perform AJAX/Fetch login

        // For demonstration purposes, simulate an error message
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    
    document.addEventListener("DOMContentLoaded", function() {
        const inputs = document.querySelectorAll('.form__input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const minLength = input.getAttribute('minlength');
                const errorMessage = input.parentElement.querySelector('.form__input-error-message');
                if (input.value.length < minLength) {
                    errorMessage.textContent = `Minimum ${minLength} characters required`;
                } else {
                    errorMessage.textContent = '';
                }
            });
        });
    });
