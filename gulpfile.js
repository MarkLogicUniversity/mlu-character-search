var gulp = require('gulp');
var jsonlint = require('gulp-jsonlint');

gulp.task('default', function() {
    gulp.src('./data/json/*.json')
    	.pipe(jsonlint())
    	.pipe(jsonlint.reporter());
});
