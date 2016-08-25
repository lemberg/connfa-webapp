var gulp = require('gulp');

var assetsDev = 'public/**/*';
var assetsProd = 'dist/public/';

var ext_replace = require('gulp-ext-replace');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var precss = require('precss');
var cssnano = require('cssnano');

gulp.task('build-assets', function () {
	return gulp.src(assetsDev)
		.pipe(gulp.dest(assetsProd));
});

gulp.task('build-scss', function () {
	return gulp.src('src/assets/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({includePaths: ['src/assets/styles/components']}))
		.pipe(postcss([precss, cssnano]))
		.pipe(sourcemaps.write())
		.pipe(ext_replace('.css'))
		.pipe(gulp.dest('public/styles/'));
});

gulp.task('htaccess', function () {
	gulp.src('public/.htaccess')
		.pipe(gulp.dest('dist'));
})

gulp.task('watch', function () {
	gulp.watch('src/assets/styles/**/*', ['build-scss', 'build-assets']);
});

gulp.task('build', ['build-scss', 'build-assets', 'htaccess']);

