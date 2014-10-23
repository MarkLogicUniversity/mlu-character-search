var gulp = require('gulp');
var jsonlint = require('gulp-jsonlint');

gulp.task('default', function() {
    gulp.src('./json/*.json')
    	.pipe(jsonlint())
    	.pipe(jsonlint.reporter());
});