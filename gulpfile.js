var gulp = require('gulp'),
    concat = require('gulp-concat'),
    pipe = require('gulp-pipe'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    html2js = require('gulp-html2js');



var paths = {
    app: ['./src/Favorites.js','./src/controllers/*.js','./src/services/*.js'],
    dest: './dist',
    less: ['./src/less/*.less'],
    fixtures: ['./src/fixtures/*.html']

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

gulp.task('fixtures', function() {
    gulp.src(paths.fixtures)
        .pipe(html2js({
            outputModuleName: 'Favorites.templates',
            useStrict: true
        }))
        .pipe(concat('template.js'))
        .pipe(gulp.dest(paths.dest))
})

gulp.task('watch', function(){
    gulp.watch([paths.app, paths.less, paths.fixtures], ['concat','less','fixtures']);
});


