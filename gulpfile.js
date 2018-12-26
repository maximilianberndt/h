'use strict';
 
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglifycss = require('gulp-uglifycss'),
	htmlmin = require('gulp-htmlmin'),
	removeHtmlComments = require('gulp-remove-html-comments'),
	minify = require('gulp-minify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	mozjpeg = require('imagemin-mozjpeg'),
    webserver = require('gulp-webserver');

const paths = {
	src: 'src',
    srcHTML: 'src/**/*.html',
    srcCSS: 'src/css/*.css',
	srcSASS: 'src/sass/**/*.scss',
    srcJS: 'src/js/**/*.js',
    srcIMG: 'src/img/**/*',
    srcRobots: 'src/robots.txt',
    srcManifest: 'src/manifest.webmanifest',

    dist: 'dist',
    distCSS: 'dist/css',
    distHTML: 'dist/html',
    distJS: 'dist/js',
    distIMG: 'dist/img',
}
 

// ---------------------------------------
//	Develop
// ---------------------------------------

// Compile Sass
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    return gulp.src(paths.srcSASS)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
});

// Start webserver with livereload
gulp.task('dev:webserver', function() {
    return gulp.src(paths.src)
        .pipe(webserver({
            port: 8000,
            livereload: true,
            open: true
        }));
});

// Watch sass file
gulp.task('dev:watch', function() {
    return gulp.watch(paths.srcSASS, gulp.series('sass'));
});

// Default task
gulp.task('default', gulp.series('dev:webserver', 'dev:watch'));





// ---------------------------------------
//	Distribute
// ---------------------------------------

// 	Minify CSS
gulp.task('css', function () {
  	return gulp.src(paths.srcCSS)
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest(paths.distCSS));
});

// First generate the css file from the sass file and then minify it
gulp.task('dist:css', gulp.series('sass', 'css'));

// Minify all css files
gulp.task('dist:html', () => {
	return gulp.src(paths.srcHTML)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(removeHtmlComments())
    .pipe(gulp.dest(paths.dist));
});

// Minify js file and service worker js file
gulp.task('dist:js', function () {
	return gulp.src(paths.srcJS)
	.pipe(minify({
        ext: {
            min:'.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest(paths.distJS));
});


// Minify images
gulp.task('dist:img', () =>
	gulp.src(paths.srcIMG)
		.pipe(imagemin([
	    	pngquant({quality: '50'}),
	      	mozjpeg({quality: '50'})
	    ], {
			verbose: true
		}))
		.pipe(gulp.dest(paths.distIMG))
);


// Copy robots.txt und webmanifest 
gulp.task('dist:copy', function () {
	return gulp.src([
    	paths.srcRobots,
    	paths.srcManifest
    ]).pipe(gulp.dest(paths.dist));
});

gulp.task('dist', gulp.series('dist:copy', 'dist:html', 'dist:js', 'dist:css', 'dist:img'));







