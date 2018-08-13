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

gulp.task('styles', function(){
	return gulp.src(_.src + '/sass/**/*.sass')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest(_.build + '/css'))
		.pipe(bs.stream());
});

gulp.task('markup', function(){
	return gulp.src(_.src + '/views/**/!(_)*.pug')
	.pipe($.pug({
		pretty: true
	}))
	.pipe(gulp.dest(_.build));
});

// create a task that ensures the `markup` task is complete before
// reloading browsers
gulp.task('markup-watch', ['markup'], function(done){
	bs.reload();
	done();
});

gulp.task('server', ['markup', 'styles'], function(){
	bs.init({
		server: _.build
	});

	gulp.watch(_.src + '/sass/**/*.sass', ['styles']);
	gulp.watch(_.src + '/views/**/*.pug', ['markup-watch']);
});
