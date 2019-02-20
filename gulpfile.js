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
gulp.task('styles', function() {
    return gulp
        .src(_.src + '/sass/**/*.scss')
        .pipe($.sass({ sourceMap: true }).on('error', $.sass.logError))
        .pipe(gulp.dest(_.build + '/css'))
        .pipe(bs.stream());
});

// MARKUP
// -----------
gulp.task('markup', function() {
    return gulp
        .src(_.src + '/views/**/!(_)*.html')
        .pipe($.nunjucksRender())
        .pipe(gulp.dest(_.build));
});

// JS
// -----------
gulp.task('js', function() {
    return gulp
        .src(_.src + '/js/**/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest(_.build + '/js'));
});

gulp.task('js-watch', ['js'], function(done) {
    bs.reload();
    done();
});

// ASSETS
// -----------
gulp.task('assets', function() {
    return gulp
        .src(_.src + '/images/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest(_.build + '/images'));
});

gulp.task('fonts', function() {
    return gulp.src(_.src + '/fonts/*')
    .pipe(gulp.dest(_.build + '/fonts'))
    .pipe(gulp.dest(_.dist + '/fonts'));
});

// SERVER & WATCH
// -----------
gulp.task('watch', ['markup', 'styles', 'assets', 'js'], function() {
    bs.use($.bsHtmlInjector, {
        files: _.src + '/views/**/!(_)*.html'
    });

    bs.init({
        server: _.build,
        port: 8080
    });

    $.watch(_.src + '/sass/**/*.scss', function() {
        gulp.start('styles');
    });

    $.watch(_.src + '/views/**/*.html', function() {
        gulp.start('markup', $.bsHtmlInjector);
    });

    $.watch(_.src + '/js/**/*.js', function() {
        gulp.start('js-watch');
    });

    $.watch(_.src + '/images/**/*', function() {
        gulp.start('assets');
    });
});

// CLEAN
// -----------
gulp.task('clean-build', function() {
    return gulp.src(_.build, { read: false }).pipe($.clean());
});

gulp.task('clean-dist', function() {
    return gulp.src(_.dist, { read: false }).pipe($.clean());
});

// BUILD
// ---------
gulp.task('build-styles', function() {
    return gulp
        .src(_.src + '/sass/**/*.sass')
        .pipe(
            $.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError)
        )
        .pipe(gulp.dest(_.dist + '/css'));
});

gulp.task('build-markup', function() {
    return gulp
        .src(_.src + '/views/**/!(_)*.html')
        .pipe($.nunjucksRender())
        .pipe(gulp.dest(_.dist));
});

gulp.task('build-assets', function() {
    return gulp
        .src(_.src + '/images/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest(_.dist + '/images'));
});

gulp.task('build-js', function() {
    return gulp
        .src(_.src + '/js/**/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest(_.dist + '/js'));
});

gulp.task('build', [
    'build-styles',
    'build-markup',
    'build-assets',
    'build-js',
    'fonts'
]);
