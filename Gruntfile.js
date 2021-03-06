module.exports = function(grunt) {
  
  const prefix = grunt.option('prefix') || 'public/www';

  const develop = process.env.NODE_ENV != 'production';

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
            'moment', 'moment/locale/el', 'moment/locale/es',
            'react', 'react-dom', 'prop-types',
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
            'react', 'react-dom', 'prop-types',
          ],
        },
        files: {
          'build/vendor/react.js': [],
        },
      },
      'vendor-moment': {
        options: {
          require: [
            'moment', 'moment/locale/el', 'moment/locale/es',
          ]
        },
        files: {
          'build/vendor/moment-localized.js': [],
        },
      },
    },


    sass: {
      'helloworld': {
        options: {
          style: develop? 'expanded' : 'compressed',
        },
        files: {
          'build/style.css': ['assets/style.scss'], 
        },
      },
    },


    copy: {
      options: {
        mode: '0644',
      },
      'helloworld-markup': {
         options: {
          // Pre-process certain files (before copying)
          processContent: function (data, src) {
            console.log(' **1* Pre-processing ' + src +' ...')
            return grunt.template.process(data)
          },
        },
        files: [
          {
            expand: true,
            filter: 'isFile',
            cwd: 'src/html/',
            src: '*.html',
            dest: prefix,
          }, 
        ],
      },
      'helloworld-scripts': {
        files: [
          {
            expand: true,
            filter: 'isFile',
            cwd: 'build/',
            src: '<%= pkg.name %>*.js',
            dest: prefix,
          },
        ],
      },
      'helloworld-stylesheets': { 
        files: [
          {
            expand: true,
            filter: 'isFile',
            cwd: 'build/',
            src: '*.css',
            dest: prefix,
          },
          {
            expand: true,
            filter: 'isFile',
            cwd: 'assets/fonts/',
            src: '**',
            dest: prefix + "/fonts",
          },
        ],
      },
      'vendor-scripts': {
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


    eslint: {
      'helloworld': {
        options: {
          configFile: develop? '.eslintrc.develop.js' : '.eslintrc.js',
        },
        src: [
          'src/js/**/*.js',
          '!src/js/__tests__/**/*.js',
        ],
      },
    },


    watch: {
      'helloworld-scripts': {
         files: ['src/js/**/*.js'],
         tasks: ['build:helloworld', 'copy:helloworld-scripts'],
      },
      'helloworld-markup': {
        files: ['src/html/**.html'],
        tasks: ['copy:helloworld-markup'],
      },
      'helloworld-stylesheets': {
        files: ['assets/**.scss'],
        tasks: ['sass:helloworld', 'copy:helloworld-stylesheets'],
      },
      'vendor': {
        files: ['vendor/js/**.js'],
        tasks: ['build:vendor', 'deploy:vendor'],
      },
    },

    
    jsdoc: {
      'helloworld': {
        src: ['src/js/**/*.js', '!src/js/__tests__/*.js'],
        options: {
          destination: 'jsdoc',
        }
      },
    },

  }); /* initConfig */


  //
  // Load task modules
  //

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-browserify');


  //
  // Register new tasks
  //

  grunt.registerTask('browserify:vendor', [
    'browserify:vendor-util', 'browserify:vendor-react', 'browserify:vendor-moment'
  ]);

  grunt.registerTask('build:helloworld', [
    'sass:helloworld', 'eslint:helloworld', 'browserify:helloworld', 'uglify:helloworld'
  ]);
  
  grunt.registerTask('build:vendor', [
    'browserify:vendor', 'uglify:vendor'
  ]);
  
  grunt.registerTask('build', [
    'sass', 'eslint', 'browserify', 'uglify'
  ]);
  
  grunt.registerTask('deploy:helloworld', [
    'copy:helloworld-markup', 'copy:helloworld-scripts', 'copy:helloworld-stylesheets',
  ]);
  grunt.registerTask('deploy:vendor', ['copy:vendor-scripts']);
  grunt.registerTask('deploy', ['copy']);  

  grunt.registerTask('default', 'Greet', function () {
    console.log('Hello Grunt!');
  });

};
