module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['client/js/app.js'
      ],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*.js']
      }
    },

    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jshint'],
        options: {
          livereload: true,
        }
      }
    }, 

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }

  });

  // Don't worry about this one - it just works. You'll see when you run `grunt`.
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default', ['nodemon', 'watch'
  ]);

};
