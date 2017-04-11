var gulp = require('gulp'),
	less = require('gulp-less'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	ngHtml2Js = require('gulp-ng-html2js'),
	embedTemplates = require('gulp-angular-embed-templates'),
	ngmin = require('gulp-ngmin'),
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

gulp.task("build-lib", function() {
	var jsFiles = ["app/lib/angular.js", "app/lib/angular-ui-router.js", "app/lib/angular-dialog.js"];
	gulp.src(jsFiles)
		.pipe(concat('npm.js'))
		.pipe(gulp.dest('./build/js'))
		.pipe(rename('npm.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
})
gulp.task("build-less", function() {
	gulp.src('./app/css/app.less')
		.pipe(less())
		.pipe(gulp.dest('./build/css'));
	gulp.src('./app/modules/**/**.less')
		.pipe(less())
		.pipe(concat('module.css'))
		.pipe(gulp.dest('./build/css'));
})
gulp.task("build-js", function() {
	// directive templateUrl problem;
	gulp.src('./app/modules/**/**.js')
		.pipe(embedTemplates({
			basePath: "./app/"
		}))
		.pipe(concat('module.js'))
		.pipe(gulp.dest('./build/js'));
})