'use strict';

exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    allScriptsTimeout: 110000,

    baseUrl: 'http://localhost:53074',

    directConnect: true,

    suites: {
        test: '../functional/**/*FunctionalTest.js'
    },

    onPrepare: function() {
        afterEach(function() {
            browser.manage().logs().get('browser').then(function(browserLog) {
                if(browserLog.length !== 0) {
                    throw {
                        name : "ErrorsInLog",
                        message : "There are errors in the logs",
                        stack: JSON.stringify(browserLog)
                    }
                }
            });
        });
    },

    //Stops the web server which could be running on a seperate process
    onComplete: function() {

        browser.ignoreSynchronization = true;
    },

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000
    }
};
