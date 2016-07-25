Accounts.ui.config({
    requestPermissions: {},
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});


Accounts._loginButtons.validateUsername = function(username) {
    if (username.length >= 2) {
        return true;
    } else {
        loginButtonsSession.errorMessage(i18n('errorMessages.usernameTooShort'));
        return false;
    }
};