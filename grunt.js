module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    min: {
      main: {
        src: [
          'js/jquery.js',
          'js/bootstrap.min.js',
          'js/handlebars.js',
          'js/main.js'
        ],
        dest: 'js/main.min.js'
      },
      background: {
        src: [
          'js/background.js'
        ],
        dest: 'js/background.min.js'
      }

    }
  });
  grunt.registerTask('default', 'min');

};
