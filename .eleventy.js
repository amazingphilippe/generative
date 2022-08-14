const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");
const rollupper = require("./src/utils/rollupper.js");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, cls, alt, sizes) {

  let options = {
    widths: [683],
    formats: ["webp", "png"],
    outputDir: "./dist/images/generated",
    urlPath: "/images/generated/",
    cacheOptions: {
      // if a remote image URL, this is the amount of time before it fetches a fresh copy
      duration: "1h",
    },
  };

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  metadata = await Image(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = (config, options) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/typical/");
  config.addPassthroughCopy("./src/generative/**/script.js");
  config.addPassthroughCopy("./src/generative/**/style.css");

  // Bundler js for fxhash
  config.addPlugin(rollupper, {
    rollup: {
      output: {
        format: "es",
      },
    },
  });


  config.addPassthroughCopy("./src/fx/**/script.js");
  config.addPassthroughCopy("./src/fx/**/style.css");
  config.addPassthroughCopy("./src/**/LICENSE.txt");

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addCollection("generative", function (collection) {
    return collection.getFilteredByGlob(`./src/generative/**/*.md`);
  });

  //Shortcodes
  config.addNunjucksAsyncShortcode("img", imageShortcode);

  // Add plugins

  config.addFilter("urize", function(value) {
    return encodeURIComponent(value)
  });


  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
