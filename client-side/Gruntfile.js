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

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                '!app/bower_components/**/*.js'
            ]
        },

        clean: ['.tmp', 'www'],

        concat: {
            options: {
                separator: ';'
            },
            distri: {
                src: ['app/bower_components/angular/angular.js', 'app/main.js'],
                dest: '.tmp/blaze.concat.js'
            }
        },

        uglify: {
            distri: {
                files: {
                    '.tmp/blaze.min.js': ['.tmp/blaze.annotated.js']
                }
            }
        },

        usemin: {
            html: '.tmp/index.html'
        },

        ngAnnotate: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/',
                        src: '*.js',
                        ext: '.annotated.js',
                        dest: '.tmp/'
                    }
                ]
            }
        },

        copy: {
            htmlToTmp: {
                expand: true,
                cwd: 'app/',
                src: ['index.html'],
                dest: '.tmp'
            },
            srcToWww: {
                expand: true,
                cwd: '.tmp/',
                src: ['blaze.min.js', 'index.html'],
                dest: 'www'
            }
        },

        karma: {
            unit: {
                configFile: 'test/config/karma.conf.js',
                singleRun: true
            }
        },

        wiredep: {
            options: {
                cwd: 'app',
                directory: 'app/bower_components/'
            },
            app: {
                src: ['app/index.html']
            },
            test: {
                src: ['test/config/karma.conf.js'],
                ignorePath: /..\//,
                exclude: ['/foundation', '/angular-scenario'],
                devDependencies: true
            }
        }
    });

    grunt.registerTask('serve', function () {
        grunt.task.run(['wiredep:app', 'connect', 'watch']);
    });

    grunt.registerTask('build', function () {
        grunt.task.run(['clean', 'wiredep:app', 'jshint', 'concat', 'ngAnnotate', 'uglify', 'copy:htmlToTmp', 'usemin', 'copy:srcToWww']);
    });

    grunt.registerTask('test', function (target) {
        if (target === 'unit') {
            grunt.task.run(['wiredep:test', 'karma:unit']);
        }
    });
};