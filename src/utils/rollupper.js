//const rollup = require("rollup");
const webpack = require("webpack");
const fs = require("fs");
const { fs: mfs } = require("memfs");
const path = require("path");
const crypto = require("crypto");
//const commonjs = require("rollup-plugin-commonjs");
//const { nodeResolve } = require("@rollup/plugin-node-resolve");
//const { getBabelOutputPlugin } = require("@rollup/plugin-babel

module.exports = (eleventyConfig, options) => {
  new Rollupper(eleventyConfig, options);
};

class Rollupper {
  inputFiles = {};
  rollupOptions = {};

  constructor(eleventyConfig, { shortcode = "rollup", rollup } = {}) {
    this.rollupOptions = rollup;
    eleventyConfig.on("beforeBuild", () => this.beforeBuild());
    eleventyConfig.on("afterBuild", () => this.afterBuild());

    // We want to use "this" in the callback function, so we save the class instance beforehand
    const thisRollupper = this;
    eleventyConfig.addAsyncShortcode(shortcode, function (...args) {
      return thisRollupper.rollupperShortcode(this, ...args);
    });
  }

  beforeBuild() {
    this.inputFiles = {};
  }

  async rollupperShortcode(eleventyInstance, src, fileRelative = false) {
    // Resolve to the correct relative location
    if (fileRelative) {
      src = path.join(path.dirname(eleventyInstance.page.inputPath), src);
    }

    // resolve to absolute, since rollup uses absolute paths
    src = path.resolve(src);

    // generate a unique name for the file.
    // we take the first 6 chars of the sha256 of the absolute paths.
    const fileHash = await new Promise(function (resolve, reject) {
      const hash = crypto.createHash("sha256");
      const input = fs.createReadStream(src);

      input.on("error", reject);

      input.on("data", function (chunk) {
        hash.update(chunk);
      });

      input.on("close", function () {
        resolve(hash.digest("hex"));
      });
    });
    const scriptSrc = fileHash.substr(0, 6) + ".js";

    // register for rollup bundling
    this.inputFiles[src] = scriptSrc;
    this.rollupOptions.output.dir = path.join(
      "dist/fx",
      eleventyInstance.page.fileSlug
    );

    this.rollupOptions.output.filename = scriptSrc;

    // calculate script src after bundling
    const relativePath = path.relative(
      eleventyInstance.page.outputPath,
      path.join(this.rollupOptions.output.dir, scriptSrc)
    );

    return `<script src="bundle.js" type="module"></script>`;
  }

  async afterBuild() {
    // Return early if no JS was used, since rollup throws on empty inputs
    if (!Object.keys(this.inputFiles).length) {
      return;
    }
    // Transform .js files, run through Babel
    const rules = [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ];

    // Main Config
    const webpackConfig = {
      entry: Object.keys(this.inputFiles),
      output: {
        path: path.resolve(__dirname, "../../" + this.rollupOptions.output.dir),
        filename: 'bundle.js',
      },
      module: { rules },
    };

    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        const errors =
          err || (stats.compilation ? stats.compilation.errors : null);

        reject(errors);
        return;
      }
    });

    // try {
    //   const result = await this.compile(webpackConfig);
    //   return result;
    // } catch (err) {
    //   console.log("afterBuild: ", err);
    //   return null;
    // }

    // const bundle = await rollup.rollup({
    //   input: Object.keys(this.inputFiles),
    //   treeshake: { moduleSideEffects: "no-external" },
    //   plugins: [nodeResolve(), commonjs()],
    //   ...this.rollupOptions,
    // });
    // const inputFiles = this.inputFiles;
    // await bundle.write({
    //   entryFileNames: (chunk) => {
    //     return inputFiles[chunk.facadeModuleId];
    //   },
    //   ...this.rollupOptions.output,
    // });
    // await bundle.close();
  }

  compile(webpackConfig) {
    const compiler = webpack(webpackConfig);
    compiler.outputFileSystem = mfs;
    compiler.inputFileSystem = fs;
    compiler.intermediateFileSystem = mfs;

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          const errors =
            err || (stats.compilation ? stats.compilation.errors : null);

          reject(errors);
          return;
        }

        mfs.readFile(
          webpackConfig.output.path + "/script.js",
          "utf8",
          (err, afterBuild) => {
            if (err) reject(err);
            else resolve(afterBuild);
          }
        );
      });
    });
  }
}
