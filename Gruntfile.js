'use strict'

module.exports = function(grunt) {

	const sass = require('node-sass');
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	})
	// const browserSync = require('grunt-browser-sync')(grunt);
	// browserSync(grunt);

	// require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/styles.css': 'css/styles.scss'
				}
			},
			options: {
				implementation: sass,
				sourceMap: true
			}
		},
		watch: {
			sass: {
				files: 'css/*.scss',
				tasks: ['sass']
			}			
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'
					}
				}
			}
		},
		clean: {
			build: {
				src: ['dist/']
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, src: ['./*.html'], dest: 'dist/'},
					{expand: true, cwd: './node_modules/font-awesome/', src: ['fonts/*.*'],	dest: 'dist/'}
				]
			}
		},
		imagemin: {
			png: {
				options: {
					progressive: true
				},
				files: [
					{expand: true, cwd: 'img/', src: ['**/*.png'], dest: 'dist/img'}
				]
			}
		},
		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['contactus.html', 'aboutus.html', 'index.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block) {
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0, rebase: false
								};
							}
						}]
					}
				}
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},
		uglify: {
			dist: {}
		},
		cssmin: {
			dist: {}
		},
		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css'
					]
				}]
			}
		},
		usemin: {
			html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
			options: {
				assetsDirs: ['dist', 'dist/css', 'dist/js']
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
        			collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'dist/index.html',
					'dist/contactus.html': 'dist/contactus.html',
					'dist/aboutus.html': 'dist/aboutus.html'
				}
			}
		}
	});

	//replaced with the jit-grunt
	// grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-browser-sync');

	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-imagemin');
	// grunt.loadNpmTasks('grunt-contrib-usemin');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-filerev');
	// grunt.loadNpmTasks('grunt-contrib-htmlmin');


	grunt.registerTask('build', ['clean','copy','imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);

	grunt.registerTask('default', ['browserSync', 'watch']);
}