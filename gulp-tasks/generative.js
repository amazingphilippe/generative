// Import `src` and `dest` from gulp for use in the task.
const { src, dest } = require("gulp");

// Import Gulp plugins.
const plumber = require("gulp-plumber");
const gulpEsbuild = require("gulp-esbuild");
const rename = require("gulp-rename");
const rollup = require("gulp-better-rollup")

// Gulp 4 uses exported objects as its tasks. Here we only have a
// single export that represents the default gulp task.
const generative = () => {
  // This will grab any file within src/generative or its
  // subdirectories, then ...
  return (src("./src/generative/**/script.js")
    .pipe(rollup({ input: file => file.path }))
    // Stop the process if an error is thrown.
    .pipe(plumber())
    // Concatenate all files within src/generative and its
    // subdirectories into a single file named main.js.
    //.pipe(concat("main.js"))
    // Transpile the JS code using Babel's preset-env.
    .pipe(
      gulpEsbuild({
        outdir: "",
        bundle: true,
        minify: true
      })
    )
    .pipe(rename(function (path) {
      // Updates the object in-place
      path.extname = ".min.js";
    }))
    // Save each component as a separate file in dist.
    .pipe(dest("./dist/generative"))
  );
};

module.exports = generative;
