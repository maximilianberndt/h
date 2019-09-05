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
  webserver = require('gulp-webserver'),
  imageResize = require('gulp-image-resize'),
  rename = require("gulp-rename"),
  merge = require('merge-stream'),
  ico = require('gulp-to-ico'),
  rollup = require('gulp-better-rollup'),
  babel = require('rollup-plugin-babel'),
  resolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  del = require('del'),
  fileinclude = require('gulp-file-include');


const paths = {
    src: 'src/',
    
    srcDevHTML: 'src/dev/pages/**/*.html',
    srcHTML: 'src/*.html',

    srcCSS: 'src/assets/css/*.css',
    srcSASS: 'src/dev/sass/**/*.scss',

    srcJS: 'src/dev/js/**/*.js',

    srcIMG: 'src/assets/img/**/*',
    srcSVG: 'src/assets/img/**/*.svg',
    srcMP4: 'src/assets/img/**/*.mp4',
    srcROBOTS: 'src/robots.txt',
    srcMANIFEST: 'src/assets/meta/manifest.webmanifest',
    srcICON: 'src/assets/meta/icon.png',
    srcOG: 'src/assets/meta/og.jpg',
    srcFONTS: 'src/assets/fonts/*',

    dist: 'dist',
    distCSS: 'dist/css',
    distHTML: 'dist/html',
    distJS: 'dist/js',
    distIMG: 'dist/img',
    distMETA: 'dist/meta',
    distFONTS: 'dist/fonts',
}
 





// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
//  Develop
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

// Compile JS
gulp.task('js', () => {
  return gulp.src( paths.srcJS )
      .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
      .pipe(gulp.dest( 'src/assets/js' ));
});

gulp.task('cleanJs', function(cb) {
    del(['src/assets/js/*', '!src/assets/js/main.js'], cb);
});


// Compile Sass
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    return gulp.src(paths.srcSASS)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css/'))
});


// Complie html template
gulp.task('html', function() {
  return gulp.src([paths.srcDevHTML])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./src'));
});




// Start webserver with livereload
gulp.task('dev:webserver', function() {
    return gulp.src(paths.src)
        .pipe(webserver({
            port: 8000,
            livereload: false,
            open: false
        }));
});


gulp.task('dev:watch', function() {
    gulp.watch(paths.srcSASS, gulp.series('sass'));
    gulp.watch(paths.srcJS, gulp.series('js', 'cleanJs'));
    gulp.watch(paths.srcDevHTML, gulp.series('html'));
});


// Default task
gulp.task('default', gulp.series('dev:webserver', 'dev:watch'));









// ---------------------------------------
// ---------------------------------------
// ---------------------------------------
//  Distribute
// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

//   Minify CSS
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
  return gulp.src(paths.distJS)
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
        pngquant({quality: '80'}),
          mozjpeg({quality: '80'})
      ], {
      verbose: true
    }))
    .pipe(gulp.dest(paths.distIMG))
);

// Copy SVG
gulp.task('dist:svg', () =>
  gulp.src(paths.srcSVG)
    .pipe(gulp.dest(paths.distIMG))
);

// Copy mp4
gulp.task('dist:copyMP4', function () {
    return gulp.src(paths.srcMP4)
        .pipe(gulp.dest(paths.distIMG));
});

// Create icons for webmanifest 
// sizes: 256x256, 128x128, 65x64
gulp.task('dist:icons', function () {
    let icons = [
        { 
            suffix: '-lowres',
            size: 64
        }, {
            suffix: '-midres',
            size: 256
        }, {
            suffix: '-highres',
            size: 512
        }
    ];
    var streams = [];

    icons.forEach(function(icon) {
        var stream = gulp.src(paths.srcICON)
            .pipe(imageResize({
              width : icon.size,
              height : icon.size,
              crop : false,
              upscale : true,
              filter: "Catrom"
            }))
            .pipe(imagemin([
                pngquant({quality: '80'}),
                mozjpeg({quality: '80'})
            ]))
            .pipe(rename(function (path) { path.basename += icon.suffix; }))
            .pipe(gulp.dest(paths.distMETA))
        streams.push(stream);
    });
    return merge(streams);
});

// Generate og image with 1800x1200 size
gulp.task('dist:og', function(){
    return gulp.src(paths.srcOG)
        .pipe(imageResize({
              width: 1800,
              height: 1200,
              crop: false,
              upscale : true,
              filter: "Catrom"
            }))
        .pipe(gulp.dest(paths.distMETA));
});

// Generate favicon with 16x16 size
gulp.task('dist:favicon', function(){
    return gulp.src(paths.srcICON)
        .pipe(imageResize({
              width : 16,
              height : 16,
              crop : false,
              upscale : true,
              filter: "Catrom"
            }))
        .pipe(ico('favicon.ico'))
        .pipe(gulp.dest(paths.distMETA));
});

// Copy robots.txt
gulp.task('dist:copyRobots', function () {
  return gulp.src(paths.srcROBOTS)
        .pipe(gulp.dest(paths.dist));
});

// Copy webmanifest 
gulp.task('dist:copyMeta', function () {
    return gulp.src(paths.srcMANIFEST)
        .pipe(gulp.dest(paths.distMETA));
});

// All tasks to generate meta
gulp.task('dist:meta', gulp.series('dist:copyRobots', 'dist:copyMeta', 'dist:favicon', 'dist:icons', 'dist:og'))


gulp.task('dist', gulp.series('dist:html', 'dist:js', 'dist:css', 'dist:img', 'dist:copyMP4', 'dist:svg', 'dist:meta'));
