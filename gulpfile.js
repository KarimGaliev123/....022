const { src, dest, watch, series, parallel } = require('gulp')
const fileInclude = require('gulp-file-include')
const browserSync = require('browser-sync').create()
const gulp_sass = require('gulp-sass')
const dart_compiler = require('sass')
const sass = gulp_sass(dart_compiler)

function html() {
	return src('./src/*.html')
		.pipe(
			fileInclude({
				prefix: '@@',
				basepath: '@file',
			}),
		)
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}

function images() {
	return src('./src/img/**/*', { encoding: false })
		.pipe(dest('dist/img'))
		.pipe(browserSync.stream())
}

function fonts() {
	return src('./src/fonts/**/*', { encoding: false })
		.pipe(dest('dist/fonts'))
		.pipe(browserSync.stream())
}

function icons() {
	return src('./src/icons/**/*', { encoding: false })
		.pipe(dest('dist/icons'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('./src/styles/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest('dist/styles'))
		.pipe(browserSync.stream())
}

function serve() {
	browserSync.init({ server: 'dist' })
	watch('./src/**/*.html', html)
	watch('./src/styles/**/*.scss', styles)
}

exports.build = parallel(html, styles)
exports.default = series(parallel(html, styles, images, fonts, icons), serve)
