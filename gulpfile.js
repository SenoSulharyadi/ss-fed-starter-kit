import gulp from 'gulp';
import sass from 'gulp-sass';
import nunjucksRender from 'gulp-nunjucks-render';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
const server = browserSync.create(),
    _ = {
        src: 'src',
        build: 'build',
        dist: 'dist'
};

// STYLES
// -----------
function styles() {
    return gulp
        .src(_.src + '/sass/**/*.scss')
        .pipe(sass({ sourceMap: true }).on('error', sass.logError))
        .pipe(gulp.dest(_.build + '/css'))
        .pipe(server.stream());
};

// MARKUP
// -----------
function markup() {
    return gulp
        .src(_.src + '/views/**/!(_)*.html')
        .pipe(nunjucksRender())
        .pipe(gulp.dest(_.build));
};

// JS
// -----------
function js() {
    return gulp
        .src(_.src + '/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(_.build + '/js'));
};

// ASSETS
// -----------
function assets() {
    return gulp
        .src(_.src + '/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(_.build + '/images'));
};

function fonts() {
    return gulp.src(_.src + '/fonts/*')
    .pipe(gulp.dest(_.build + '/fonts'))
    .pipe(gulp.dest(_.dist + '/fonts'));
};

function build(cb) {
    gulp.series(markup, styles, assets, js, fonts);
    cb();
}

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: _.build
        }
    });
    done();
}

// SERVER & WATCH
// -----------
const watch = () => gulp.watch(_.src, gulp.series(markup, styles, assets, js, fonts, reload));

const dev = gulp.series(serve, watch);
export default dev;
