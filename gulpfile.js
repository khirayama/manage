'use strict';
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var please = require('gulp-pleeease');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

var SRC_ROOT = 'src';
var DIST_ROOT = 'dist';

var options = {
  styles: {
    sass: {
      errLogToConsole: true,
      indentedSyntax: true
    },
    please: {
      minifier: false,
      autoprefixer: {
        browsers: [
          'last 4 version',
          'ie 8',
          'iOS 4',
          'Android 2.3'
        ]
      }
    }
  },
  scripts: {
    browserify: {
      entries: ['src/scripts/index.js'],
      transform: ['babelify'],
      extensions: ['.jsx', '.js']
    },
    watchify: {
      entries: ['src/scripts/index.js'],
      transform: ['babelify'],
      debug: true,
      extensions: ['.jsx', '.js'],
      cache: {},
      packageCache: {},
      plugin: [watchify]
    }
  },
  server: {
    browserSync: {
      server: {
        baseDir: DIST_ROOT
      },
      notify: false,
      open: true
    }
  }
};

function buildMarkups(isWatch) {
  function build() {
    console.log('build markups');
    return gulp.src('src/index.jade')
      .pipe(plumber())
      .pipe(jade())
      .pipe(gulp.dest(DIST_ROOT))
      .pipe(browserSync.reload({ stream: true }));
  }

  if (isWatch) {
    return function() {
      gulp.watch('src/index.jade', build);
    };
  } else {
    return function() {
      build();
    };
  }
}

function buildStyles(isWatch) {
  function build() {
    console.log('build styles');
    return gulp.src('src/styles/index.sass')
      .pipe(plumber())
      .pipe(sass(options.styles.sass))
      .pipe(please(options.styles.please))
      .pipe(gulp.dest(DIST_ROOT))
      .pipe(browserSync.reload({ stream: true }));
  }

  if (isWatch) {
    return function() {
      gulp.watch('src/styles/**/*.sass', build);
    };
  } else {
    return function() {
      build();
    };
  }
}

function bundle(isWatch) {
  return function () {
    var options_ = (!isWatch) ? options.scripts.browserify : options.scripts.watchify;
    var bundler = browserify(options_);

    bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(DIST_ROOT))
    .pipe(browserSync.reload({ stream: true }));

    if (isWatch) {
      bundler.on('update', bundle.bind(this, isWatch));
    }
  }
}

function buildImages() {
  return gulp.src(['src/**/*.{png,jpg,gif}'])
    .pipe(plumber())
    .pipe(gulp.dest(DIST_ROOT));
}

function buildFiles() {
  return gulp.src(['src/**/*.{csv,json}'])
    .pipe(gulp.dest(DIST_ROOT));
}

function runServer() {
  return browserSync.init(null, options.server.browserSync);
}

// tasks
gulp.task('build:markups', buildMarkups(false));
gulp.task('watch:markups', buildMarkups(true));
gulp.task('build:styles', buildStyles(false));
gulp.task('watch:styles', buildStyles(true));
gulp.task('build:scripts', bundle(false));
gulp.task('watch:scripts', bundle(true));
gulp.task('build:images', buildImages);
gulp.task('build:files', buildFiles);
gulp.task('server', runServer);
