/*
 * app.web-app
 * http://github.amexpub.com/modules/app.web-app
 *
 * Copyright (c) 2013 Amex Pub. All rights reserved.
 */


'use strict';
var exec = require('child_process').exec,
    fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    jsbeautifier: {
      files: ["<%= jshint.all %>"],
      options: {
        "indent_size": 2,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "eval_code": false,
        "indent_case": false,
        "unescape_strings": false,
        "space_after_anon_function": true
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: {
        src: 'test/**/*.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/controller/*.js',
        'app/helpers/*.js',
        'test/**/*.js',
        'config/**/*.js',
        'model/**/*.js',
        'app.js',
        'package.json',
        'lib/**/*.js',
        'app/resources/browserify/src/*.js',
        'test/**/*.js'
      ]
    },
    watch: {
      scripts: {
        // files: '**/*.js',
        files: [
          'Gruntfile.js',
          'app/controller/*.js',
          'app/helpers/*.js',
          'views/**/*.js',
          'test/**/*.js',
          'config/**/*.js',
          'model/**/*.js',
          'app.js',
          'package.json',
          'app/resources/browserify/src/*.js',
          'public/stylesheets/*.less'
        ],
        tasks: ['lint', 'less'],
        options: {
          interrupt: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["dist/public/stylesheets"],
          yuicompress: true
        },
        files: {
          "example/assets/css/app.css": "./public/assets/css/app.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('test', 'simplemocha');

  var broswerifyFiles = fs.readdirSync(__dirname+"/app/resources/browserify/src");

  grunt.event.on('watch', function(action, filepath, target) {
    for(var x in broswerifyFiles){
      exec("browserify "+__dirname+"/app/resources/browserify/src/"+broswerifyFiles[x]+" -o "+__dirname+"/public/scripts/"+broswerifyFiles[x]);
    }
    // exec("browserify "+__dirname+"/app/resources/browserify/src/footer.js -o "+__dirname+"/public/scripts/appfooter.js");
    // grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};

