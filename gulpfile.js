var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');

var path = require('path');
 
gulp.task('sass', function () {
    gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./styles'));
});

// TODO -- concat into one style folder
gulp.task('watch', function(){
	gulp.watch('./styles/*.scss', ['compass']);
	// gulp.watch('./styles/*.scss', ['sass']);
});


// This replaces the sass thing
gulp.task('compass', function() {
  gulp.src('./styles/*.scss')
    .pipe(compass({
      project: path.join(__dirname, ''),
      css: './styles',
      sass: './styles'
    }))
    .on('error', function(err) {
            // Would like to catch the error here
            console.log("You messed up");
        })
    .pipe(gulp.dest('./styles'));
});

// have it just watch when just 'gulp' is put in the command line
gulp.task('default', ['watch']);

// TODO -- include browserify so that requiring jquery is easier