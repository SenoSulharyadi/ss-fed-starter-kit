var gulp = require('gulp'),

	$ = require('gulp-load-plugins')({
		pattern: '*',
		lazy: true
	}),

	bs = $.browserSync.create(),

	_ = {
		src: 'src',
		build: 'build',
		dist: 'dist'
	};


// STYLES
// -----------
gulp.task('styles', function(){
	return gulp.src(_.src + '/sass/**/*.sass')
		.pipe($.sass({ sourceMap: true }).on('error', $.sass.logError))
		.pipe(gulp.dest(_.build + '/css'))
		.pipe(bs.stream());
});


// MARKUP
// -----------
gulp.task('markup', function(){
	return gulp.src(_.src + '/views/**/!(_)*.pug')
	.pipe($.pug())
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
gulp.task('server', ['markup', 'styles', 'assets'], function(){
	bs.init({
		server: _.build
	});

	gulp.watch(_.src + '/sass/**/*.sass', ['styles']);
	gulp.watch(_.src + '/views/**/*.pug', ['markup-watch']);
	gulp.watch(_.src + '/images/**/*', ['assets']);
});


// CLEAN
// -----------
gulp.task('clean-build', function() {
	return gulp.src( _.build, {read: false})
		.pipe($.clean());
});

gulp.task('clean-dist', function() {
	return gulp.src( _.dist, {read: false})
		.pipe($.clean());
});


// BUILD
// ---------
gulp.task('build-styles', function(){
	return gulp.src(_.src + '/sass/**/*.sass')
		.pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError))
		.pipe(gulp.dest(_.dist + '/css'));
});

gulp.task('build-markup', function(){
	return gulp.src(_.src + '/views/**/!(_)*.pug')
	.pipe($.pug())
	.pipe(gulp.dest(_.dist));
});

gulp.task('build-assets', function() {
	return gulp.src( _.src + '/images/**/*')
		.pipe($.imagemin())
		.pipe(gulp.dest(_.dist + '/images'));
});

gulp.task('build', ['build-styles', 'build-markup', 'build-assets']);