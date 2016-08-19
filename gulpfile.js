var gulp = require('gulp');

var assetsDev = 'public/**/*';
var assetsProd = 'dist/public/'

gulp.task('build-assets', function () {
	return gulp.src(assetsDev)
		.pipe(gulp.dest(assetsProd));
});
