describe('Given app is loaded', function() {
    it('it should display hearder with content "This is deployed"', function() {
        browser.driver.get(browser.baseUrl + '/index.html');
        var header = browser.driver.findElement(by.css('h1'));
        expect(header.getText()).toEqual("This is deployed");
    });
});