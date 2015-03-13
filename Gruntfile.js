'use strict';
module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Sass task
    sass: {
      dev: {
        options: {
          style: 'compressed',
          lineNumbers: true
        },
        files: {
          'css/main.css': 'scss/main.scss'
        }
      }
    },

    // Lint our JS
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: [
        'Gruntfile.js'
      ],
      scripts: [
        'scripts/{,*/}*.js',
        '!scripts/plugins/modernizr-custom.js'
      ]
    },

    // Watch tasks
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['scripts/{,*/}*.js'],
        tasks: ['newer:jshint:scripts']
      },
      scss: {
        files: ['scss/{,*/}*.scss'],
        tasks: ['sass:dev']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['newer:jshint:gruntfile']
      }
    },

    // Generate pared-down modernizr build based on used Modernizr methods
    modernizr: {
      dist: {
        // [REQUIRED] Path to the build you're using for development.
        'devFile': 'bower_components/modernizr/modernizr.js',

        // [REQUIRED] Path to save out the built file.
        'outputFile': 'scripts/plugins/modernizr-custom.js',
        'uglify': true,
        'files': {
          'src': ['scripts/{,*/}*.js', 'scss/{,*/}*.scss']
        }
      }
    }
  });

  // Default task
  grunt.registerTask('default', [
    'sass',
    'modernizr',
    'watch'
  ]);
};
