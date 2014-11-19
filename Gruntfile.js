'use strict';
module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        compass: {
            dev: {                    
                options: {
                    sassDir: './src/styles',
                    cssDir: './src/styles'
                }
            }
        },

        connect: {
            options: {
                hostname: 'localhost',
                livereload: 35729
            },
            webserver: {
                options: {
                    base: 'src/',
                    port: 8888,
                    keepalive: true
                }
            },
            devserver: {
                options: {
                    middleware: function (connect) {
                        return [
                          connect.static('.tmp'),
                          connect().use(
                            '/bower_components',
                            connect.static('./bower_components')
                          ),
                          connect.static('src')
                        ];
                    },
                    port: 8888
                }
            },
            testserver: {
                options: {
                    middleware: function (connect) {
                        return [
                          connect.static('.tmp'),
                          connect().use(
                            '/bower_components',
                            connect.static('./bower_components')
                          ),
                          connect.static('src')
                        ];
                    },
                    port: 9999
                }
            },
        },

     /**
     * `jshint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside `src/`.
     */
        jshint: {
            src: [
              'src/**/*.js'
            ],
            test: {
                src: ['test/**/*.js', '!test/**/*.conf.js']
            },
            gruntfile: [
              'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globalstrict: true,
                undef:false,
                predef: ['module','require','angular','gapi','describe','expect','it','browser']

            },
            globals: {}
        },

        karma: {
            unit: {
                configFile: './test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },

        protractor: {
            options: {
                keepAlive: true,
                configFile: "./test/protractor-e2e.conf.js"
            },
            singlerun: {},
        },

        open: {
            devserver: {
                path: 'http://localhost:8888'
            }
        },

        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
       /**
       * When the Gruntfile changes, we just want to lint it. In fact, when
       * your Gruntfile changes, it will automatically be reloaded!
       */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },
          /**
          * When our JavaScript source files change, we want to run lint them and
          * run our unit tests.
          */
            jssrc: {
                files: [
                  'src/**/*.js'
                ],
                tasks: ['jshint:src']
            },
            /**
       * When assets are changed, copy them. Note that this will *not* copy new
       * files, so this is probably not very useful.
       */
            assets: {
                files: [
                  'src/assets/**/*'
                ],
                tasks: []
            },

            sass: {
                files: [
                  'src/style/**/*.sass'
                ],
                tasks: ['compass']
            },
            /**
       * When index.html changes, we need to compile it.
       */
            html: {
                files: ['src/**/*.html'],
                tasks: ['index:build']
            }

        },

        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                  'src/{,*/}*.html'
                ],
                ignorePath: /\.\.\//
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-compass');

    //TODO
    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['jshint', 'compass', 'wiredep', 'connect:devserver', 'open:devserver', 'watch']);

    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);

    //TODO 1 year of moo
    ////single run tests
    grunt.registerTask('test', ['test:unit', 'test:e2e']);
    //grunt.registerTask('test', ['jshint', 'test:unit', 'test:e2e']);
    grunt.registerTask('test:unit', ['jshint:test', 'karma:unit']);
    grunt.registerTask('test:e2e', ['connect:testserver', 'protractor:singlerun']);

    //TODO 2 year of moo
    ////autotest and watch tests
    //grunt.registerTask('autotest', ['karma:unit_auto']);
    //grunt.registerTask('autotest:unit', ['karma:unit_auto']);
    //grunt.registerTask('autotest:e2e', ['connect:testserver', 'shell:selenium', 'watch:protractor']);

    //TODO 3 year of moo
    ////coverage testing
    //grunt.registerTask('test:coverage', ['karma:unit_coverage']);
    //grunt.registerTask('coverage', ['karma:unit_coverage', 'open:coverage', 'connect:coverage']);
};