const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/typical/");
  config.addPassthroughCopy("./src/generative/**/script.js");
  config.addPassthroughCopy("./src/generative/**/style.css");

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addCollection("generative", function (collection) {
    return collection.getFilteredByGlob(`./src/generative/**/*.md`);
  });

  // Add plugins


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
