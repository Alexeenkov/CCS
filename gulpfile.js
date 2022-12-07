const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

let changeDirToParent = function (file) {
  file.dirname = file.dirname.split("/").slice(0, -1).join("/");
};

let Path = {
  filesCore: "**/src/"
};

let commonScss = function () {
  return gulp
    .src(Path.filesCore + "*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(
      rename(function (file) {
        changeDirToParent(file);
      })
    )
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest((file) => file.base));
};

let commonJs = function () {
  return gulp
    .src(Path.filesCore + "*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      rename(function (file) {
        changeDirToParent(file);
      })
    )
    .pipe(gulp.dest((file) => file.base));
};

gulp.task("commonScss", commonScss);
gulp.task("commonJs", commonJs);

let watch = function () {
  gulp.watch(Path.filesCore + "*.scss", commonScss);
  gulp.watch(Path.filesCore + "*.js", commonJs);
};

gulp.task("watch", watch);

gulp.task(
  "build",
  gulp.series(gulp.parallel(commonScss, commonJs))
);

gulp.task("default", gulp.series("build", "watch"));
