module.exports = function(grunt) {
  
  var prefix = grunt.option('prefix') || 'public/www';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    
    clean: {
      options: {
        force: true,
      },
      helloworld: {
        src: [
            'build/*', 'public/www/*',
        ],
      },
    },
    
    
    uglify: {
      options: {
        banner: '/*! Package: <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      'helloworld': {
        files: { 
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js'],
        },
      },
      'vendor': {
        files: {
          'build/vendor/util.min.js': ['build/vendor/util.js'],
          'build/vendor/moment-localized.min.js': ['build/vendor/moment-localized.js'],
          'build/vendor/react.min.js': ['build/vendor/react.js'],         
        },
      },
    },
   

    browserify: {
      options: {
        /* moved to package.json */
      },
      'helloworld': {
        options: {
          // Exclude the modules below from being packaged into the main JS file:
          // The following will be resolved globally (shim) or via earlier vendor includes
          external: [
            'isomorphic-fetch', 'lodash', 'rgbcolor',
            'react', 'react-dom', 'react-router',
          ]
        },
        files: {
          'build/<%= pkg.name %>.js': ['src/js/main.js'],
        },
      },
      'vendor-util': {
        options: {
          alias: [
            'isomorphic-fetch:fetch',
            'lodash',
            'rgbcolor',
          ]
        },
        files: {
          'build/vendor/util.js': []
        },
      },
      'vendor-react': {
        options: {
          require: [
            'react', 'react-dom', 'react-router',
          ],
        },
        files: {
          'build/vendor/react.js': [],
        },
      },
      'vendor-moment': {
        options: {
        },
        files: {
          'build/vendor/moment-localized.js': ['vendor/js/moment-localized.js'],
        },
      },
    },


    copy: {
      options: {
        mode: '0644',
      },
      'helloworld': {
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
            src: '<%= pkg.name %>*.js',
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
      'vendor': {
        files: [ 
          {
            expand: true,
            filter: 'isFile',
            cwd: 'build/',
            src: 'vendor/*.js',
            dest: prefix,
          },
        ],
      },
    },


    watch: {
      'helloworld': {
         files: [
           'src/js/**.js',
           'src/js/components/**.js',
           'src/html/**.html',
           'assets/style.css'
         ],
         tasks: ['build:helloworld', 'deploy:helloworld'],
      },
      'vendor': {
        files: [
           'vendor/js/**.js', 
        ],
        tasks: ['build:vendor', 'deploy:vendor'],
      },
    },
  });

  // Load task modules

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Register new tasks

  grunt.registerTask('browserify:vendor', [
    'browserify:vendor-util', 'browserify:vendor-react', 'browserify:vendor-moment'
  ]);

  grunt.registerTask('build:helloworld', ['browserify:helloworld', 'uglify:helloworld']);
  grunt.registerTask('build:vendor', ['browserify:vendor', 'uglify:vendor']);
  grunt.registerTask('build', ['browserify', 'uglify']);
  
  grunt.registerTask('deploy:helloworld', ['copy:helloworld']);
  grunt.registerTask('deploy:vendor', ['copy:vendor']);
  grunt.registerTask('deploy', ['copy']);  

  grunt.registerTask('default', 'Greet', function () {
    console.log('Hello Grunt!');
  });
  
};
