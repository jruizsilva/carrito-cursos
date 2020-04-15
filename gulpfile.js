const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function styles(){
    return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
}
function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('scss/*.scss', styles);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);
}
exports.styles = styles;
exports.watch = watch;