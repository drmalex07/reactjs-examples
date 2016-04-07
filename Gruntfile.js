module.exports = function(grunt) {
  
  var prefix = grunt.option('prefix') || 'deploy/';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: {
      options: {
        force: true,
      },
      helloworld: {
        src: [
            'build/*', 'deploy/*',
        ],
      },
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      helloworld: {
        files: { 
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js'],
        },
      },
      moment: {
        files: {
          'build/moment-localized.min.js': ['build/moment-localized.js'],
        },
      },
    },
    
    browserify: {
      options: {
        exclude: [
            'react',
            'react-dom',
        ],
        transform: [
            ['babelify'],
        ],
      },
      helloworld: {
        files: {
          'build/<%= pkg.name %>.js': ['src/js/main.js', 'src/js/greet.js'],
        },
      },
      moment: {
        files: {
          'build/moment-localized.js': ['vendor/moment-localized.js'],
        },
      },
    },

    copy: {
      options: {
        mode: '0644',
      },
      helloworld: {
        options: {
          // Pre-process certain files (before copying)
          processContent: function (data, src) {
            console.log(' **1* Pre-processing ' + src +' ...')
            return grunt.template.process(data)
          },
          processContentExclude: [
            'build/*.js',
            'build/*.min.js',
            'assets/*.css',
            'assets/fonts/**'
          ],
        },
        // Define what is to be copied
        files: [
          {
            expand: true,
            filter: 'isFile',
            cwd: 'build/',
            src: 'hello-react*.js',
            dest: prefix,
          },
          {
            expand: true,
            filter: 'isFile',
            cwd: 'build/',
            src: 'moment*.js',
            dest: prefix,
          },
          {
            expand: true,
            filter: 'isFile',
            cwd: 'src/html/',
            src: '*.html',
            dest: prefix,
          },
          {
            expand: true,
            filter: 'isFile',
            cwd: 'assets/',
            src: '**',
            dest: prefix,
          },
        ],
      },
    },

    watch: {
      helloworld: {
         files: [
           'src/js/**.js',
           'src/js/components/**.js',
           'src/html/**.html',
           'assets/style.css'
         ],
         tasks: ['build', 'deploy'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  // Register new tasks

  grunt.registerTask('build', ['browserify', 'uglify']);
  
  grunt.registerTask('deploy', ['copy:helloworld']);  

  grunt.registerTask('default', 'Greet', function () {
    console.log('Hello Grunt!');
  });
  
};
