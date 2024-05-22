function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".details-form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("details-form__message--success", "details-form__message--error");
    messageElement.classList.add(`details-form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("details-form__input--error");
    inputElement.parentElement.querySelector(".details-form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("details-form__input--error");
    inputElement.parentElement.querySelector(".details-form__input-error-message").textContent = "";
}

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the forms
    const viewForm = document.getElementById('accountDetails');
    const updateForm = document.getElementById('updateAccountDetails');
    const deleteForm = document.getElementById('deleteAccount');

    // Get reference to the button in the view form
    const updateButton = viewForm.querySelector('.details-form__button');

    // Add event listener to switch to the update form
    updateButton.addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Hide the view form
        viewForm.classList.add('details-form--hidden');

        // Show the update form
        updateForm.classList.remove('details-form--hidden');
    });

    // Get reference to the delete button in the update form
    const deleteButtonUpdateForm = updateForm.querySelector('.details-form__button-Delete');

    // Add event listener to switch to the delete form from the update form
    deleteButtonUpdateForm.addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Hide the update form
        updateForm.classList.add('details-form--hidden');

        // Show the delete form
        deleteForm.classList.remove('details-form--hidden');
    });

    // Get reference to the delete button in the view form
    const deleteButtonViewForm = viewForm.querySelector('.details-form__button-Delete');

    // Add event listener to switch to the delete form from the view form
    deleteButtonViewForm.addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Hide the view form
        viewForm.classList.add('details-form--hidden');

        // Show the delete form
        deleteForm.classList.remove('details-form--hidden');
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

    document.querySelectorAll(".details-form__input").forEach(inputElement => {
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
