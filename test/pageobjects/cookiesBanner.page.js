const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CookiesBanner extends Page {
    /**
     * define selectors using getter methods
     */
    constructor() {
        super();
        this.cookiesBanner = '.ot-sdk-container';
        this.acceptAllCookiesButton = '#onetrust-accept-btn-handler';

    }

    get inputEmail () {
        return $(this.emailInput);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async waitWhenCookiesBannerAppearsAndAcceptAllCookies () {
        await this.waitWhenElementIsDisplayed(this.cookiesBanner);
        await this.clickCoveredElement(this.acceptAllCookiesButton);
        await $(this.cookiesBanner).waitForDisplayed({ reverse: true });
    }

}

module.exports = new CookiesBanner();
