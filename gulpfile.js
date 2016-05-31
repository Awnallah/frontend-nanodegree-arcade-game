var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var imageMin = require('gulp-imagemin');
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src(['js/app.js', 'js/engine.js'])
    .pipe(concat('combined.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('comprJS', ['concat'] , function() {
	gulp.src(['js/resources.js', 'dist/js/combined.js'])
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('comprCSS', function() {
	gulp.src('css/style.css')
	.pipe(csso())
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('comprImg', function() {
    return gulp.src('images/*.png')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images/'));
});


gulp.task('default', ['comprJS', 'comprCSS', 'comprImg']);