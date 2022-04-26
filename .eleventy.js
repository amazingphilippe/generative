const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");
const rollupper = require("./src/utils/rollupper.js");

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
