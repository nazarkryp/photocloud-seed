var gutil = require('gulp-util');

exports.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e'
};

exports.wiredep = {
    exclude: [/jquery/],
    directory: 'bower_components'
};

exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());

        console.log(title);
        console.log(err);

        this.emit('end');
    };
};