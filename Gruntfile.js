'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true
      },
      src: [
        'Gruntfile.js',
        'server.js',
        'models/**/*.js',
        'routes/**/*.js',
        'lib/**/*.js',
        'app/js/**/*.js'
      ]
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: [
        'Gruntfile.js',
        'server.js',
        'models/**/*.js',
        'routes/**/*.js',
        'lib/**/*.js',
        'app/js/**/*.js'
      ]
    },

    simplemocha: {
      all: {
        src: ['test/server/**/*.js']
      }
    },

    clean: {
      dev: {
        src: ['build/']
      },
      pub: {
        src: ['public/']
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      pub: {
        src: ['app/js/**/*.js'],
        dest: 'public/bundle.js'
      },
      karmatest: {
        src: ['test/client/**/*_test.js'],
        dest: 'test/client/karma_test_bundle.js'
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.png', '**/*.css'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      },
      pub: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.png', '**/*.css'],
        dest: 'public/',
        flatten: false,
        filter: 'isFile'
      }
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('production', ['clean:pub', 'browserify:pub', 'copy:pub']);
  grunt.registerTask('test:server', ['jshint', 'jscs', 'simplemocha:all']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:test']);
};
