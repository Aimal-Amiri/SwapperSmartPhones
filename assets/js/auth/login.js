// global window
class Login {
    constructor(form, fields) {
        this.errorMessage = '';
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        // a "submit" event listener to the form
        this.form.addEventListener("submit", (e) => {
            e.preventDefault(); // remove default functionality
            let error = 0;

            // loop through the fields and validate them
            this.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                console.log(error);
                if (this.validateFields(input) == false) {
                    error++;
                }
            });
            // if everything validates, error will be 0 and can continue
            if (error == 0) {
                localStorage.setItem('auth', 1);
                this.form.submit();
            }
        });
    }

    // validating each input field
    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                'error',
            );
            return false;
        } if (field.value != 'admin') {
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} incorrect `,
                'error',
            );
            return false;
        }

        this.setStatus(field, null, "success");
        return true;
    }

    // setting status in the form to show the error
    setStatus(field, message, status) {
        this.errorMessage = field.parentElement.querySelector('.error-message');

        if (!this.errorMessage) return; // Prevent potential null reference errors

        if (status == 'success') {
            if (this.errorMessage) {
                this.errorMessage.innerText = '';
            }
        }
        if (status == 'error') {
            this.errorMessage.innerText = message;
        }
    }
}

// Initialize login validation if form exists
const form = document.getElementById('loginForm');
if (form) {
    const fields = ['username', 'password'];
    const login = new Login(form, fields);
}