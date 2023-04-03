const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task("pug", function () {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("build"));
});

gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(
      sass({
        // outputStyle: 'compressed'
      })
    )
    .pipe(gulp.dest("build/css"));
});

gulp.task("watch", function () {
  gulp.watch("src/pug/**/*.pug", gulp.series("pug"));
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });
  browserSync.watch("build", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("pug", "sass"), gulp.parallel("watch", "serve"))
);
