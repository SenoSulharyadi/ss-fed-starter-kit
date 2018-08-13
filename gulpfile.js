var gulp = require('gulp'),

	$ = require('gulp-load-plugins')({
		pattern: '*',
		lazy: true
	}),

	_ = {
		src: 'src',
		build: 'build'
	};

gulp.task('styles', function(){
	return gulp.src(_.src + '/sass/**/*.sass')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe(gulp.dest(_.build + '/css'));
		// .pipe($.browserSync.create().stream();
});

gulp.task('markup', function(){
	return gulp.src(_.src + '/views/**/!(_)*.pug')
		.pipe($.pug({
			pretty: true
		}))
		.pipe(gulp.dest(_.build));
});

