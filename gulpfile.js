var gulp = require('gulp'),
    concat = require('gulp-concat'),
    pipe = require('gulp-pipe'),
    watch = require('gulp-watch'),
    less = require('gulp-less');



var paths = {
    app: ['./src/app.js','./src/controllers/*.js','./src/services/*.js'],
    dest: './dist',
    less: ['./src/less/*.less']

};


gulp.task('concat',function(){
    gulp.src(paths.app)
        .pipe(concat('ngFavorites.js'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('less', function(){
    gulp.src(paths.less)
        .pipe(concat('ngFavorites.less'))
        .pipe(less('ngFavorites.less'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function(){
    gulp.watch(paths.app, ['concat']);
});


