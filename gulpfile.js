var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
    gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./styles'));
});

// TODO -- concat into one style folder
gulp.task('watch', function(){
	gulp.watch('./styles/*.scss', ['sass']);
});