module.exports = function(grunt) {

	var matchdep = require('matchdep');

	// Filter devDependencies (with config string indicating file to be required)
	matchdep.filterDev('grunt-contrib-*', './package.json').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// uglify
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: {
					drop_console: true
				},
				mangle: {
					except: ['jQuery', 'Foundation', '_']
				}
			},
			app: {
				files: {
					 './dist/public/scripts/libs/vendor.min.js': [
					 	'./app/libs/jquery/dist/jquery.min.js',
					 	'./app/libs/modernizr/modernizr.js',
					 	'./app/libs/foundation/js/foundation.min.js',
					 	'./app/libs/underscore/underscore.min.js',
					 	'./app/libs/backbone/backbone.js',
					 ]
					// './app/public/scripts/app.min.js': []
				}
			}		
		},

		// jshint
		// jshint: {
		// 	options: {
		// 		reporter: require('jshint-stylish')
		// 	},
		// 	all: ['./Gruntfile.js', '.app/**/*.js']
		// },

		// sass - scss
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: './app/libs/foundation/scss',
					src: ['*.scss'],
					dest: './app/public/stylesheets',
					ext: '.css'
				},
				{
					expand: true,
					cwd: './app/public/stylesheets/scss',
					src: ['*.scss'],
					dest: './app/public/stylesheets',
					ext: '.css'
				}]
			}
		},

		//minifica css
		cssmin: {
			add_banner: {
				options: {
					banner: '/* minified main.css file, includes(normalize.css,foundation.css, base.css) - <%= grunt.template.today("yyyy-mm-dd") %>*/'
				},
				files: {
					'./dist/public/stylesheets/main.min.css': [
			      		'./app/public/stylesheets/normalize.css',
			      		'./app/public/stylesheets/foundation.css',
			      		'./app/public/stylesheets/base.css'
			      	]
				}
			}
		},

		copy: {
			main: {
				files: [
					// includes files within path
					{expand: true, cwd: './app/', src: ['*.html'], dest: './dist/', filter: 'isFile'},

					// // includes files within path and its sub-directories
					// {expand: true, cwd: './app/', src: ['public/**'], dest: './dist/'}
				],
			},
		},

		// watch
		watch: {
			css: {
				files: ['./app/**/*.scss'],
				tasks: ['sass:dist']
			},

			cssmin: {
				files: ['./app/**/*.css'],
				tasks: ['cssmin:add_banner'],
				options: { livereload: true }
			},			

			copy: {
				files: ['./app/**'],
				tasks: ['copy:main']
			},

			src: {
                files: ['*.html'],
                options: { livereload: true }
            }
		}
	});

	// Load the plugin that provides the "uglify" and "watch" task.
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'watch']);

};