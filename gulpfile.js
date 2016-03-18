'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const tictail = require('gulp-tictail');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');

const src = {
    scripts: 'src/scripts/**/*.js',
    styles: 'src/styles/**/*.scss',
    theme: 'src/*.mustache'
};

const dest = 'dist';

function errorHandler(error) {
    util.log(error);
    this.emit('end');
}

gulp.task('styles', function () {
    gulp.src(src.styles)
        .pipe(plumber(errorHandler))
        .pipe(sass())
        .pipe(gulp.dest(dest))
        .pipe(livereload());
});

gulp.task('scripts', function() {
    gulp.src(src.scripts)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(babel())
        .pipe(gulp.dest(dest))
        .pipe(livereload());
});

gulp.task('theme', function() {
    gulp.src(src.theme)
        .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch(src.styles, ['styles']);
    gulp.watch(src.scripts, ['scripts']);
    gulp.watch(src.theme, ['theme']);
});

gulp.task('serve', function() {
    tictail.serve({store_id: 't'});
    livereload.listen({basePath: dest});
});

gulp.task('default', ['watch', 'serve', 'styles', 'scripts']);
