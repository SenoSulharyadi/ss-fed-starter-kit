var gulp = require('gulp'),

	$ = require('gulp-load-plugins')({
		pattern: '*',
		lazy: true
	}),

	bs = $.browserSync.create(),

	_ = {
		src: 'src',
		build: 'build'
	};


// STYLES
// -----------
gulp.task('styles', function(){
	return gulp.src(_.src + '/sass/**/*.sass')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest(_.build + '/css'))
		.pipe(bs.stream());
});


// MARKUP
// -----------
gulp.task('markup', function(){
	return gulp.src(_.src + '/views/**/!(_)*.pug')
	.pipe($.pug({
		pretty: true
	}))
	.pipe(gulp.dest(_.build));
});


// create a task that ensures the `markup` task is complete before
// reloading browsers
// -----------
gulp.task('markup-watch', ['markup'], function(done){
	bs.reload();
	done();
});


// IMAGES
// -----------
gulp.task('assets', function() {
	return gulp.src( _.src + '/images/**/*')
		.pipe($.imagemin())
		.pipe(gulp.dest(_.build + '/images'));
});


// SERVER & WATCH
// -----------
gulp.task('server', ['markup', 'styles'], function(){
	bs.init({
		server: _.build
	});

	gulp.watch(_.src + '/sass/**/*.sass', ['styles']);
	gulp.watch(_.src + '/views/**/*.pug', ['markup-watch']);
	gulp.watch(_.src + '/images/**/*', ['assets']);
});


// CLEAN
// -----------
gulp.task('clean', function() {
	return gulp.src( _.build, {read: false})
		.pipe($.clean());
});

