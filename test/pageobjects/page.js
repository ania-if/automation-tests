/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(path)
    }

    async clickCoveredElement(selector) {
        return await browser.execute((browserSelector) => {
            document.querySelector(browserSelector).click();
        }, selector);
    }

    async waitWhenElementIsDisplayed(sel) {
        const selector = $(sel);
        await selector.waitForDisplayed({ timeout: 10000 });
    }

}
