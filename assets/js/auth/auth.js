/* global window */
class Auth {
    // setup the class and hide the body by default
    constructor() {
        this.window = window;
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }

    // checking if the localStorage item passed to the function is valid and set
    validateAuth(auth) {
        if (auth != 1) {
            this.window.location.replace("/");
        } else {
            document.querySelector("body").style.display = "block";
        }
    }

    // removing the localStorage item and redirect to main/home page
    logOut() {
        localStorage.removeItem("auth");
        this.window.location.replace("../index.html");
    }
}

const auth = new Auth();

document.querySelector("#admin-logout").addEventListener("click", (e) => {
    e.preventDefault();
    auth.logOut();
});