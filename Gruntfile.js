"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            root: {
                src: './*.js'
            },
            lib: {
                src: [ './lib/**/*.js' ]
            },
            test: {
                src: [ './test/**/*.js' ]
            }
        },
        mochacli: {
            all_dot: {
                options: {
                    files: [ './test/**/*_test.js' ],
                    reporter: 'dot'
                }
            },
            all_spec: {
                options: {
                    files: [ './test/**/*_test.js' ],
                    reporter: 'spec'
                }
            },
            utils: {
                options: {
                    files: [ './test/utils_test.js' ],
                    reporter: 'spec'
                }
            },
            prototyper: {
                options: {
                    files: [ './test/Prototyper_test.js' ],
                    reporter: 'spec'
                }
            },
            class: {
                options: {
                    files: [ './test/class_test.js' ],
                    reporter: 'spec'
                }
            },
            instance: {
                options: {
                    files: [ './test/instance_test.js' ],
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.registerTask('default', [ 'jshint', 'mochacli:all_dot' ]);

    grunt.registerTask('test', [ 'mochacli:all_spec' ]);

    grunt.registerTask('test:utils', [ 'mochacli:utils' ]);
    grunt.registerTask('test:prototyper', [ 'mochacli:prototyper' ]);
    grunt.registerTask('test:class', [ 'mochacli:class' ]);
    grunt.registerTask('test:instance', [ 'mochacli:instance' ]);
};
