var gulp = require('gulp'),
	less = require('gulp-less'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create();
gulp.task("less", function() {
	gulp.src(['app/**/*.less'])
		.pipe(less())
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('app'));
})
gulp.task('dowatch', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch('app/**/*.less', ['less']);
});