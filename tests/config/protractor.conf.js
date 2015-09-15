'use strict';

exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    allScriptsTimeout: 110000,

    baseUrl: 'http://localhost:53074',

    directConnect: false,

    suites: {
        test: '../functional/**/*FunctionalTest.js'
    },

    onPrepare: function() {
        console.log(process.env.SAUCE_USERNAME);
        console.log(process.env.SAUCE_ACCESS_KEY);
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
        'browserName': 'chrome',

        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,

        'build': 12345,

        'name': 'My test name'
    },

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000
    }
};
