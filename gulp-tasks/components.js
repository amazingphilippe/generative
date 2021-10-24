// Import `src` and `dest` from gulp for use in the task.
const { src, dest } = require("gulp");

// Import Gulp plugins.
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");

const gulpEsbuild = require("gulp-esbuild");

// Gulp 4 uses exported objects as its tasks. Here we only have a
// single export that represents the default gulp task.
const components = () => {
  // This will grab any file within src/components or its
  // subdirectories, then ...
  return (
    src("./src/components/**/*.js")
      // Stop the process if an error is thrown.
      .pipe(plumber())
      // Concatenate all files within src/components and its
      // subdirectories into a single file named main.js.
      //.pipe(concat("main.js"))
      // Transpile the JS code using Babel's preset-env.
      .pipe(
        gulpEsbuild({
          outdir: "",
          bundle: true,
          minify: process.env.NODE_ENV === "production"
        })
      )
      // Save each component as a separate file in dist.
      .pipe(dest("./dist/js"))
  );
};

module.exports = components;
