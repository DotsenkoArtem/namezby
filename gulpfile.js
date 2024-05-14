const gulp = require("gulp");
const debug = require("gulp-debug");
const del = require("del");
const imagemin = require("gulp-imagemin");

const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const webp = require("gulp-webp");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

const uglify = require("gulp-uglify");
const through2 = require("through2").obj;
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const combiner = require("stream-combiner2").obj;
const concat = require("gulp-concat");

const browserSync = require("browser-sync").create();
const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV == "development";




// F O N T S
// Fonts: conversion .ttf --> .woff, saving into public/
gulp.task("ttf2woff", function () {
  return gulp
    .src("src/assets/**/*.ttf", { since: gulp.lastRun("ttf2woff") })
    .pipe(ttf2woff())
    .pipe(gulp.dest("public"));
});

// Fonts: conversion .ttf --> .woff2, saving into public/
gulp.task("ttf2woff2", function () {
  return gulp
    .src("src/assets/**/*.ttf", { since: gulp.lastRun("ttf2woff2") })
    .pipe(
      ttf2woff2({
        clone: true,
      })
    )
    .pipe(gulp.dest("public"));
});

// Fonts: copying .TTF into public/
gulp.task("ttf", function () {
  return gulp
    .src("src/assets/**/*.ttf", { since: gulp.lastRun("ttf") })
    .pipe(gulp.dest("public"));
});

// Fonts: conversion and copying
gulp.task("fonts", gulp.parallel("ttf", "ttf2woff", "ttf2woff2"));




// Copying PHP
gulp.task("php", function () {
  return gulp
    .src("src/php/**/*.*", { since: gulp.lastRun("php") })
    .pipe(gulp.dest("public/php/"));
});

// Copying libs
gulp.task("libs", function () {
  return gulp
    .src("src/assets/libs/**/*.*", { since: gulp.lastRun("libs") })
    .pipe(gulp.dest("public/libs/"));
});


// Copying audio
gulp.task("audio", function () {
  return gulp
    .src("src/assets/audio/**/*.*", { since: gulp.lastRun("audio") })
    .pipe(gulp.dest("public/audio/"));
});




// I M G
// Img : conversion .png to .webp
gulp.task("webp", function () {
  return gulp
    .src([
      "src/assets/img/**/*.png",
      "!src/assets/img/icons/**/*.*",
      "!src/assets/img/favicons/**/*.*",
    ])
    .pipe(
      webp({
        // preset: 'photo',
        quality: 95,
      })
    )
    .pipe(gulp.dest("public/img"));
});


// Img : copying, minification
gulp.task("imgmin", function () {
  return gulp
    // .src(["src/assets/img/**/*.*", "!src/assets/img/icons/**/*.*"], {
    .src(["src/assets/img/**/*.*"], {
      since: gulp.lastRun("img"),
    })
    .pipe(
      gulpIf(function (file) {
        return file.extname !== ".svg";
      }, imagemin([
        imageminPngquant(),
        imageminMozjpeg({ quality: 70, progressive: true }),
      ]))
    )
    .pipe(gulp.dest("public/img"));
});


// Img : conversion, minification, copying
gulp.task("img", gulp.series("imgmin", "webp"));


// A S S E T S
gulp.task("assets", gulp.parallel("fonts", "img", "audio"));




// JS-CONCAT
// Concatination of js-files
function getComponentJsPath(name) {
  let params = []
  for(let item of name) {
    item = `src/components/${item}/component.js`
    params.push(item)
  }
  return params
};

// const jsSrcConcatFiles = ['src/js/common/*.js', ...getComponentJsPath('preloader', 'form', 'modal')];
const components = [
  'preloader',
  // 'modal',
  
  // 'form',
  // 'menu-underline-js',
  // 'btn-vawe',
];

const jsSrcConcatFiles = ['src/js/common/*.js', ...getComponentJsPath(components)];
gulp.task("js-concat", function () {
  return gulp
    .src(jsSrcConcatFiles)
    .pipe(concat("script.js"))
    .pipe(gulp.dest("src/js/"));
});


// JS - MINIFY
// Minification, conversion to ES5
gulp.task("js-minify", function () {
  return combiner(
    // gulp.src("src/js/**/*.js"),
    gulp.src("src/js/*.js"),
    // Rename, copy file
    through2(function (file, enc, callback) {
      let fileDev = file.clone();
      fileDev.stem += ".dev";

      let fileDevMin = fileDev.clone();
      fileDevMin.stem += ".min";

      this.push(fileDev);
      this.push(fileDevMin);

      callback(null, file);
    }),
    gulpIf(
      function (file) {
        return file.stem.includes(".dev");
      },
      babel({
        presets: ["@babel/preset-env"],
      })
    ),

    gulpIf(function (file) {
      return file.stem.includes(".min");
    }, uglify()),
    gulp.dest("public/js")
  ).on(
    "error",
    notify.onError(function (err) {
      return {
        title: "Error: Java Script",
        message: err.message,
      };
    })
  );
});

// J S
gulp.task("js", gulp.series("js-concat", "js-minify"))




// S T Y L E S
gulp.task("styles", function () {
  return combiner(
    gulp.src("src/styles/sass/layout.sass"),
    gulpIf(isDevelopment, sourcemaps.init()),
    sass(),
    autoprefixer({
      cascade: false,
    }),
    // Переименование файла
    through2(function (file, enc, callback) {
      file.stem = "style";
      let fileMin = file.clone();
      fileMin.stem += ".min";
      this.push(fileMin);
      callback(null, file);
    }),
    gulpIf(isDevelopment, sourcemaps.write(".")),
    gulpIf(function (file) {
      return file.stem.includes(".min");
    }, cleanCSS({ compatibility: "ie8" })),
    gulp.dest("public/css")
  ).on(
    "error",
    notify.onError(function (err) {
      return {
        title: "Error: Styles",
        message: err.message,
      };
    })
  );
});




// P U  G
gulp.task("pug", function () {
  return combiner(
    gulp.src("src/pug/pages/*.*"),
    gulpIf(function (file) {
      return file.extname == ".pug";
    }, pug({ pretty: true })),
    gulp.dest("public")
  ).on(
    "error",
    notify.onError(function (err) {
      return {
        title: "Error: pug",
        message: err.message,
      };
    })
  );
});




// W A T C H
gulp.task("watch", function () {
  gulp.watch("src/assets/fonts/", gulp.series("fonts"));
  gulp.watch("src/assets/audio/", gulp.series("audio"));
  gulp.watch(
    ["src/assets/img/**/*.*", "!src/assets/img/icons/**/*.svg"],
    gulp.series("img")
  );
  gulp.watch(jsSrcConcatFiles, gulp.series("js-concat"));
  gulp.watch('src/js/*.js', gulp.series("js-minify"));

  gulp.watch(["src/styles/**/*.sass", "src/components/**/component.sass"], gulp.series("styles"));
  gulp.watch("src/pug/**/*.*", gulp.series("pug"));
  gulp.watch("src/php/**/*.*", gulp.series("php"));
  gulp.watch("src/assets/libs/**/*.*", gulp.series("libs"));
});



// S E R V E
gulp.task("serve", () => {
  browserSync.init({
    server: "public",
  });
  browserSync.watch("public/**/*.*").on("change", browserSync.reload);
});




// C L E A N
gulp.task("clean", function () {
  return del(["public", "tmp", "src/js/script.js"]);
});




// B U I L D
gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.series("assets", "js", "styles", "pug", "php", "libs")
  )
);




// D E V E L O P M E N T
gulp.task("dev:lite", gulp.series("build", gulp.parallel("watch")));
gulp.task("dev", gulp.series("build", gulp.parallel("watch", "serve")));
