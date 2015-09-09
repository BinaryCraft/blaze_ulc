// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '../../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jspm','jasmine'],

        exclude: [],

        port: 8080,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: true,

        jspm: {
            config: 'system.config.js',
            packages: 'jspm_packages',
            loadFiles: ['source/**/*UnitTest.js'],
            serveFiles: ['source/**/*.js']
        }
    });
};
