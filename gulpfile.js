'use strict'

var { series, parallel, src, dest, watch } = require('gulp');
var sass = require('gulp-sass');
// sass.compiler = require('node-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var cleanCss = require('gulp-clean-css');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin');


function preprocessSass(cb) {
	src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css/'));
	cb();
}

function wachSass(cb) {
	watch('./css/**/*.scss', preprocessSass);
	cb();
}

function browser(cb) {
	browserSync.init({
		server: {
			baseDir: './'
		},
		files: [
			'./*.html',
			'./css/**/*.css',
			'./js/**/*.js',
			'./img/**.*{jpg,jpeg,png,gif}'
		]
	});
	cb();
}

function clean(cb) {
	del.sync(['dist']);
	cb();
}

function copyFonts() {
	return src('node_modules/font-awesome/fonts/*.{ttf,woff,woff2,eof,svg}')
	// return src('node_modules/font-awesome/fonts/*')
	.pipe(dest('./dist/fonts'));
}

function imageminTask() {
	return src('img/*')
	.pipe(imagemin())
	.pipe(dest('./dist/img'));
}

function useminTask() {
	return src('./*.html')
	.pipe(flatmap(function(stream, file) {
		return stream
		.pipe(usemin({
			css: [rev()],
			html: [function() {return htmlmin({collapseWhitespace: true, removeComments: true})}],
			js: [uglify(), rev()],
			inlinejs: [uglify()],
			inlinecss: [cleanCss(), 'concat']
		}))
	}))
	.pipe(dest('dist/'));
}

// function defaultTask(cb) {
// 	// series(preprocessSass, wachSass, browser);
// 	series(preprocessSass, wachSass);
// 	cb();
// }

// exports.default = series(preprocessSass, wachSass);
exports.default = parallel(series(preprocessSass, wachSass), browser);

exports.build = series(clean, copyFonts, imageminTask, useminTask);
// exports.build = series(clean, minifyImg, copyFonts);
// exports.build = series(clean, copyFonts);
// exports.default = defaultTask;