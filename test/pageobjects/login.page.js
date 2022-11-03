

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    constructor() {
        super();
        this.signInLink = '[data-gnav-element-name="SignIn"] a';
        this.emailInput = '#ifl-InputFormField-3';
        this.emailSubmitButton = '[data-tn-element="auth-page-email-submit-button"]';
        this.googlePasswordLink = '#auth-page-google-password-fallback';
        this.passwordInputFormField = '[data-tn-element="auth-page-login-password-input-form-field"]';
        this.passwordFormSubmitButton = '[data-tn-element="auth-page-sign-in-password-form-submit-button"]';
        this.accountMenu = '#AccountMenu';
    }

    get inputEmail () {
        return $(this.emailInput);
    }

    get inputPassword () {
        return $(this.passwordInputFormField);
    }

    get btnSubmit () {
        return $(this.emailSubmitButton);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (email) {
        await this.inputEmail.setValue(email);
        await this.clickCoveredElement(this.emailSubmitButton);
    }

    async clickOnLogInUsingYourPasswordLink() {
        await this.clickCoveredElement(this.googlePasswordLink);
    }

    async enterPassword (email) {
        await this.inputPassword.setValue(email);
        await this.clickCoveredElement(this.passwordFormSubmitButton);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open (url) {
        return super.open(url);
    }
}

module.exports = new LoginPage();
