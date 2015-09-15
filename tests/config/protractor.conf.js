'use strict';

exports.config = {
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    allScriptsTimeout: 110000,

    baseUrl: 'http://127.0.0.1:53074',

    sauceSeleniumAddress: 'localhost:4445/wd/hub',

    directConnect: false,

    suites: {
        test: '../functional/**/*FunctionalTest.js'
    },

    onPrepare: function() {
        afterEach(function() {
            browser.manage().logs().get('browser').then(function(browserLog) {
                var actualErrors = browserLog.filter(function(logEntry){
                    var seleniumWebsocketDisconnectErrorFilter = !logEntry.message.match(/ws:\/\/127\.0\.0\.1:53074\/index\.html\/ws/);
                    return seleniumWebsocketDisconnectErrorFilter
                });

                if(actualErrors.length !== 0) {
                    throw {
                        name : "ErrorsInLog",
                        message : "There are errors in the logs",
                        stack: JSON.stringify(actualErrors)
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

        'build': process.env.TRAVIS_BUILD_NUMBER,

        'name': 'Functional Tests'
    },

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000
    }
};
