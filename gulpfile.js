const gulp = require('gulp');
const browserSync = require('browser-sync');
const rollup = require('rollup');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', () => {
  browserSync.init({
    server: { baseDir: './app/dist' },
  });
  gulp.watch('app/**/*.html', { ignored: 'app/dist/**/*.html' }, gulp.series('html', (done) => {
    browserSync.reload();
    done();
  }));
  gulp.watch('app/**/*.js', { ignored: 'app/dist/**/*.js' }, gulp.series('rollup-js', 'js', (done) => {
    browserSync.reload();
    done();
  }));
});

gulp.task('rollup-js', () => (
  rollup
    .rollup({
      input: 'app/main.js',
    })
    .then((bundle) => bundle.write({
      file: 'app/dist/bundle.js',
      format: 'cjs',
      name: 'bundle',
    }))
));

gulp.task('js', () => (
  gulp.src('app/dist/bundle.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(minify({
      noSource: true,
    }))
    .pipe(gulp.dest('app/dist'))
));

gulp.task('html', () => (
  gulp.src(['app/**/*.html', '!app/dist/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('app/dist'))
));

gulp.task('json', () => (
  gulp.src('app/demo.json')
    .pipe(gulp.dest('app/dist'))
));

gulp.task('default', gulp.series('rollup-js', 'js', 'html', 'json', 'server'));
