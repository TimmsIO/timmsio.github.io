module.exports = function (grunt) {

  // files configuration
  var siteName = "Morgan Timms -- Timms.IO"
  var concatDepot = 'src/_concatted/'

  // source configurations
  var globaljs = {
    compiledName: 'siteScripts',
    contributingFiles: [
      'src/js/global/*.js',
      '_excludes/multi.js/src/multi.js'
    ],
    destAssetsFolder: 'assets/js/site/'
  };
  var toolsFilter = {
    compiledName: 'filter',
    contributingFiles: [
      'src/js/app/tools/*.js'
    ],
    destAssetsFolder: 'assets/js/tools/'
  };
  var searchTools = {
    compiledName: 'search',
    contributingFiles: [
      'src/js/app/search/*.js'
    ],
    destAssetsFolder: 'assets/js/search/'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! ' + siteName + ' <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      sitejs: {
        src: concatDepot + globaljs.compiledName + '.js',
        dest: globaljs.destAssetsFolder + globaljs.compiledName + '.min.js'
      },
      tooljs: {
        src: concatDepot + toolsFilter.compiledName + '.js',
        dest: toolsFilter.destAssetsFolder + toolsFilter.compiledName + '.min.js'
      },
      searchjs: {
        src: concatDepot + searchTools.compiledName + '.js',
        dest: searchTools.destAssetsFolder + searchTools.compiledName + '.min.js'
      }
    },
    concat: {
      sitejs: {
        src: globaljs.contributingFiles,
        dest: concatDepot + globaljs.compiledName + '.js',
      },
      tooljs: {
        src: toolsFilter.contributingFiles,
        dest: concatDepot + toolsFilter.compiledName + '.js',
      },
      searchjs: {
        src: searchTools.contributingFiles,
        dest: concatDepot + searchTools.compiledName + '.js',
      },
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', [
    // concat tasks
    'concat:sitejs',
    'concat:tooljs',
    'concat:searchjs',
    // minify tasks
    'uglify:sitejs',
    'uglify:tooljs',
    'uglify:searchjs'
  ]);

};