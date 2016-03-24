/**
 * Created by francizidar on 24/03/16.
 */

var gulp    = require('gulp');
var domSrc  = require('gulp-dom-src');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var cheerio = require('gulp-cheerio');
var cssmin  = require('gulp-cssmin');
var imageResize = require('gulp-image-resize');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('js', function(){

    domSrc({ file: 'index.html', selector: 'script', attribute: 'src' })
        .pipe(concat('app.full.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));

});

gulp.task('img', function(){

    gulp.src('img/**')
        .pipe(imageResize({
            width : 1920,
            height : 1200,
            crop : true,
            upscale : false
        }))
        .pipe(imageminJpegRecompress({loops: 3})())
        .pipe(gulp.dest('./dist/img'));

});

gulp.task('html', function(){

    gulp.src('index.html')
        .pipe(cheerio(function($){

            $('script').remove();
            $('link').remove();
            $('body').append('<script src="app.full.js"></script>');
            $('head').append('<link href="app.full.css" rel="stylesheet">')

        }))
        .pipe(gulp.dest('./dist'));

});

gulp.task('css', function(){

    domSrc({ file: 'index.html', selector: 'link', attribute: 'href' })
        .pipe(cssmin())
        .pipe(concat('app.full.css'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('build', ['css','js','html','img']);







