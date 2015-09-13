const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const please = require('gulp-pleeease');
const browserify = require('gulp-browserify');
const watchify = require('gulp-watchify');
const notify = require('gulp-notify');
const rimraf = require('rimraf');

const options = {
  plumber: {
    errorHandler: notify.onError({
      message: 'Error: <%= error.message %>',
      sound: false,
      wait: true,
    }),
  },
};

const src = 'src/';
const dest = 'dist/';
const release = 'prod/';
const test = 'test/';

gulp.task('markups:develop', () => {
  return gulp.src(src + '**/*.jade')
    .pipe(plumber(options.plumber))
    .pipe(jade())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('markups:build', () => {
  return gulp.src(src + '**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(release));
});

gulp.task('styles:develop', () => {
  return gulp.src(src + 'styles/app.scss')
    .pipe(plumber(options.plumber))
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal',
    }))
    .pipe(please({
      'minifier': false,
      'autoprefixer': { 'browsers': ['last 4 version', 'ie 8', 'iOS 4', 'Android 2.3'] },
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles:build', () => {
  return gulp.src(src + 'styles/app.scss')
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal',
    }))
    .pipe(please({
      'minifier': true,
      'autoprefixer': { 'browsers': ['last 4 version', 'ie 8', 'iOS 4', 'Android 2.3'] },
    }))
    .pipe(gulp.dest(release));
});

gulp.task('scripts:develop', watchify((_watchify) => {
  return gulp.src([src + 'scripts/app.js'])
    .pipe(plumber(options.plumber))
    .pipe(_watchify({
      watch: true,
      outfile: 'bundle.js',
      transform: ['babelify'],
      debug: true,
      extensions: ['.js'],
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream: true}));
}));

gulp.task('scripts:build', () => {
  return gulp.src([src + 'scripts/app.js'])
    .pipe(browserify({
      outfile: 'bundle.js',
      transform: ['babelify'],
      debug: false,
      extensions: ['.js'],
    }))
    .pipe(gulp.dest(release));
});

gulp.task('images:develop', () => {
  return gulp.src([src + '**/*.+(png|jpg|gif)'])
    .pipe(plumber(options.plumber))
    .pipe(gulp.dest(dest));
});

gulp.task('images:build', () => {
  return gulp.src([src + '**/*.+(png|jpg|gif)'])
    .pipe(gulp.dest(release));
});

gulp.task('files:develop', () => {
  return gulp.src([src + '**/*.+(csv|json)'])
    .pipe(gulp.dest('public/'));
});

gulp.task('files:build', () => {
  return gulp.src([src + '**/*.+(csv|json)'])
    .pipe(gulp.dest('public/'));
});

gulp.task('test', () => {
  return gulp.src([test + '**/*.test.js'])
    .pipe(mocha({ compilers: 'js:babel/register' }));
});

gulp.task('server', () => {
  return browserSync.init(null, {
    server: {baseDir: dest},
    notify: false,
    open: 'external',
  });
});

gulp.task('watch', ['scripts:develop'], () => {
  gulp.watch([src + '**/*.jade'], ['markups:develop']);
  gulp.watch([src + '**/*.scss'], ['styles:develop']);
  gulp.watch([src + '**/*.+(png|jpg|gif)'], ['images:develop']);
  gulp.watch([src + '**/*.+(csv|json)'], ['files:develop']);
});

gulp.task('clean', (cb) => {
  rimraf('./prod', cb);
});

gulp.task('develop', ['markups:develop', 'styles:develop', 'images:develop', 'files:develop', 'watch', 'server']);
gulp.task('build', ['clean', 'markups:build', 'styles:build', 'scripts:build', 'images:build', 'files:build']);
