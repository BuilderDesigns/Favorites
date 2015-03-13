var gulp = require('gulp'),
    concat = require('gulp-concat'),
    pipe = require('gulp-pipe'),
    watch = require('gulp-watch');


var paths = {
    app: ['./src/app.js','./src/controllers/*.js','./src/services/*.js'],
    dest: './dist'

};


gulp.task('concat',function(){
    gulp.src(paths.app)
        .pipe(concat('ngFavorites.js'))
        .pipe(gulp.dest(paths.dest));
});



gulp.task('watch', function(){
    gulp.watch(paths.app, ['concat']);
});


