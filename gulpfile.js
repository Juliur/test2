var gulp = require('gulp'), 
    terser = require('gulp-terser'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin');

// Add autoprefixes
gulp.task('autoprefixes', function(){ 
  return gulp.src('app/css/test2.css')
    .pipe(autoprefixer(['last 5 versions', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
}); 

//Minify css
gulp.task('cssnano', function(){
  return gulp.src('app/css/test2.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
});

//Minify js and plugins
gulp.task('minify-js', function(){
  return gulp.src('app/test2.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', terser()))
    .pipe(gulp.dest('dist/'))
});

// Minify html
gulp.task('minify-html', function() {
  return gulp.src('app/test2.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

// Optimize images
gulp.task('img', function() {
  return gulp.src('app/img/*') 
    .pipe(imagemin({  
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
         }))
              .pipe(gulp.dest('dist/img')); 
});

