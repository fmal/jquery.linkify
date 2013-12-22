module.exports = function(grunt) {
    'use strict';

    // Load tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                report: 'gzip',
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' + '<%= grunt.template.today("mm.dd.yyyy") %> */',
                mangle: {
                    except: [
                        'jQuery',
                        '$'
                    ]
                },
                sourceMap: 'jquery.linkify.min.js.map'
            },
            my_target: {
                files: {
                  'jquery.linkify.min.js': ['jquery.linkify.js']
                }
            }
        },
        jshint: {
            options: {
                ignores: ['jquery.linkify.min.js']
            },
            files: ['*.js']
        }
    });

    grunt.registerTask('default', ['jshint', 'uglify']);
};
