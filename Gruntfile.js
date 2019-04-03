// 'use strict'

// const timeGrunt = require('time-grunt');
// const sass = require('node-sass');

// const watch = require('grunt-contrib-watch');
// const browserSync = require('grunt-browser-sync');
// const jitGrunt = require('jit-grunt');

module.exports = function(grunt) {
	// timeGrunt(grunt);
	// jitGrunt(grunt);
	// watch(grunt);
	
	// sass(grunt);
	// browserSync(grunt);

	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);

	const browserSync = require('grunt-browser-sync');
	browserSync(grunt);

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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt.registerTask('css', ['sass']);

	//grunt.registerTask('watch', ['watch']);

	grunt.registerTask('default', ['browserSync', 'watch']);
}