function validate() {
    // get the login fields
    var login_form = document.forms["frm_login"];
    var username = login_form["username"].value;
    var password = login_form["password"].value;

    // check if the username field is empty
    if (username.trim() === "") {
        login_form["username"].focus();
        alert("Please enter your woogi name.");
        // prevent form submission
        return false;
    }

    // check if the password field is empty
    if (password.trim() === "") {
        login_form["password"].focus();
        alert("Please enter your password.");
        // prevent form submission
        return false;
    }

    // allow form submission
    login_form.submit();
    return true;
}

// check for if the user hit the enter key
function checkForEnter(e) {
    if (e.keyCode === 13) {
        return validate();
    }
}