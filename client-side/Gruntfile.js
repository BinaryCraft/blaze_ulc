var cordova = require('cordova');

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    base: 'app'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['**/*.js'],
                tasks: ['jshint']
            }
        },

        //Clean distribution and cordova www folders
        clean: ["www", "dist"]
    });

    grunt.registerTask('serve', function () {
        grunt.task.run(['connect', 'watch']);
    });
}