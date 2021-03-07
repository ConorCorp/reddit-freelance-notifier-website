const {src, dest, watch, parallel, series} = require('gulp'),
      sass = require('gulp-sass'),
      eslint = require('gulp-eslint'),
      sync = require("browser-sync").create(),
      uglify = require("gulp-uglify");

const sass_src_url = 'src/scss/**/*.scss',
      js_src_url = 'src/js/**/*.js',
      css_dist_url = 'dist/css',
      js_dist_url = 'dist/js',
      html_dist_url = 'dist/*.html';

function compileSass(cb) {
    return src(sass_src_url)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(css_dist_url))
        .pipe(sync.stream());
}

function lintJs(cb) {
    return src(js_src_url)
        .pipe(eslint())
        .pipe(eslint.format())
        .on('end', function() {
            cb();
        });
}

function minify(cb) {
    return src(js_src_url) 
        .pipe(uglify().on('error', sass.logError))
        .pipe(dest(js_dist_url));
}

function watching(cb) {
    lintJs(cb);
    compileSass(cb);
    minify(cb);
    sync.init({
        server: {
            baseDir: "dist"
        }
    });
    watch(sass_src_url, compileSass);
    watch(js_src_url, lintJs);
    watch(js_src_url, minify);
    watch(html_dist_url).on('change', sync.reload);
}

exports.compileSass = compileSass;
exports.lintJs = lintJs;
exports.watching = watching;
exports.minify = minify;
exports.default = series(parallel(lintJs, compileSass), minify)