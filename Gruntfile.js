'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    
    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        connect: {
            options: {
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
                    base: 'src/',
                    port: 8888,
                    livereload: true
                }
            }
        },

        open: {
            devserver: {
                path: 'http://localhost:8888'
            }
        },

        watch: {
            files: ['src/index.html'],
            options: {
                livereload: true,
                nospawn: true
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //TODO
    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['connect:devserver', 'open:devserver', 'watch']);

    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);

    //TODO 1 year of moo
    ////single run tests
    //grunt.registerTask('test', ['jshint', 'test:unit', 'test:e2e']);
    //grunt.registerTask('test:unit', ['karma:unit']);
    //grunt.registerTask('test:e2e', ['connect:testserver', 'protractor:singlerun']);

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