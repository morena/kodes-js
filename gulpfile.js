var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    debug = require('gulp-debug'),

    pkg = require('./package.json'),
    renderer = require('./renderer');

var getTmplData = function(file) {
    // resolve path from:
    // data folder path => path to data file, then replace .html with .json
    var filename = path.resolve(pkg.html.data, path.relative(file.base, file.path)).replace('.html', '.json');
    var data = {
        "page": require(filename)
    }

    return data;
};

gulp.task('swig:docs', function() {
    var renderer = require('./renderer');

    try {
        fs.lstatSync(pkg.html.dest);
    } catch(e) {
        fs.mkdirSync(pkg.html.dest);
    }

    return gulp.src(pkg.html.source + '/**/*.html')
        .pipe(data(getTmplData))
        .pipe(swig())
        .pipe(gulp.dest(pkg.html.dest))
});
