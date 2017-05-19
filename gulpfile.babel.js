import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import gulpLoadPlugins from 'gulp-load-plugins';
import babelify from 'babelify';
import browserSync from 'browser-sync';

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const dependencies = [
  'react',
  'react-dom'
];
// keep a count of the times a task refires
let scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', () => {
  bundleApp(false);
});

gulp.task('deploy', () => {
  bundleApp(true);
});

gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src([
    './src/styles/main.scss'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./example/css/'))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('default', ['styles', 'scripts'], () => {
  browserSync({
    notify: false,
    server: ['.tmp', './'],
    port: 3000
  });
  gulp.watch(['./index.html'], [reload]);
  gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['scripts', reload]);
  gulp.watch(['./src/**/*.scss'], ['styles', reload]);
});

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
  scriptsCount++;
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
      entries: './src/index.js',
      debug: true
    })

  // If it's not for production, a separate vendors.js file will be created
  // the first time gulp is run so that we don't have to rebundle things like
  // react everytime there's a change in the js file
    if (!isProduction && scriptsCount === 1){
      // create vendors.js for dev environment.
      browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./example/js/'));
    }
    if (!isProduction){
      // make the dependencies external so they dont get bundled by the 
    // app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
      dependencies.forEach(function(dep){
        appBundler.external(dep);
      })
    }

    appBundler
      // transform ES6 and JSX to ES5 with babelify
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .on('error',gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./example/js/'));
}