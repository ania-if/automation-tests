const LoginPage = require('../pageobjects/login.page');
const CookiesBanner = require('../pageobjects/cookiesBanner.page');
const environment = require('../../test/config/environment.js');
const users = require('../../test/config/users.js');

describe('Employee Login application', () => {
    it('should verify if "Login" link is clickable on the home page', async () => {
        await LoginPage.open(environment.prod.homePage);
        await CookiesBanner.waitWhenCookiesBannerAppearsAndAcceptAllCookies();
        await LoginPage.waitWhenElementIsDisplayed(LoginPage.signInLink);
        await expect($(LoginPage.signInLink)).toBeClickable();
    });
    it('should login with valid google credentials', async () => {
        // open login page
        await LoginPage.open(environment.prod.loginPage);
        await LoginPage.waitWhenElementIsDisplayed(LoginPage.emailInput);

        // enter email address and press continue button
        await LoginPage.login(users.employee.login);

        // on the next page clicks on link "log in using your password"
        await LoginPage.waitWhenElementIsDisplayed(LoginPage.googlePasswordLink);
        await expect($(LoginPage.googlePasswordLink)).toBeClickable();
        await LoginPage.clickOnLogInUsingYourPasswordLink();

        // enter password in the next form
        await LoginPage.waitWhenElementIsDisplayed(LoginPage.passwordInputFormField);
        await LoginPage.enterPassword(users.employee.password);

        // verify if exists users profile
        await LoginPage.waitWhenElementIsDisplayed(LoginPage.accountMenu);
        await expect($(LoginPage.accountMenu)).toBeExisting();
    });
});


