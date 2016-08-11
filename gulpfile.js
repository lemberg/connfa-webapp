var gulp = require('gulp');
var sass = require('gulp-sass');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', function () {
	return gulp.src(assetsDev + 'styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({includePaths: [assetsDev + 'styles/components']}))
		.pipe(postcss([precss, cssnano]))
		.pipe(sourcemaps.write())
		.pipe(ext_replace('.css'))
		.pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('build-ts', function () {
	return gulp.src(appDev + '**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript(tsProject))
		.pipe(sourcemaps.write())
		//.pipe(jsuglify())
		.pipe(gulp.dest(appProd));
});

gulp.task('build-img', function () {
	return gulp.src(assetsDev + 'images/**/*')
	// .pipe(imagemin({
	//     progressive: true
	// }))
		.pipe(gulp.dest(assetsProd + 'images/'));
});

gulp.task('build-html', function () {
	return gulp.src(appDev + 'views/**/*.html')
		.pipe(gulp.dest(appProd + 'views/'));
});

gulp.task('build-js', function () {
	return gulp.src(assetsDev + 'js/**/*.js')
		.pipe(gulp.dest(assetsProd + 'js/'));
});

gulp.task('build-fonts', function () {
	return gulp.src(assetsDev + 'fonts/*')
		.pipe(gulp.dest(assetsProd + 'fonts/'));
});

gulp.task('watch', function () {
	gulp.watch(appDev + '**/*.ts', ['build-ts']);
	gulp.watch(assetsDev + 'styles/*', ['build-css']);
	gulp.watch(assetsDev + 'images/*', ['build-img']);
	gulp.watch(assetsDev + 'js/*', ['build-js']);
	gulp.watch(assetsDev + 'fonts/*', ['build-fonts']);
	gulp.watch(appDev + 'views/**/*.html', ['build-html']);
});

gulp.task('build', ['build-ts', 'build-css', 'build-img', 'build-js', 'build-fonts', 'build-html']);
gulp.task('default', ['watch', 'build-ts', 'build-css', 'build-img', 'build-js', 'build-fonts', 'build-html']);
