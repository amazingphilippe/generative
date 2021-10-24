const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");
const markdownIt = require("markdown-it");
const markdownItRenderer = new markdownIt();
const markdownItAnchor = require("markdown-it-anchor");

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/typical/");
  config.addPassthroughCopy("./src/generative/**/script.js");
  config.addPassthroughCopy("./src/generative/**/style.css");

  config.addPassthroughCopy({ "./src/_data/media/**/*.jpg": "images" });
  config.addPassthroughCopy({ "./src/_data/media/**/*.png": "images" });
  config.addPassthroughCopy({ "./src/_data/media/**/*.svg": "images" });

  config.addPassthroughCopy({ "./src/_data/media/**/*.mp4": "media" });
  config.addPassthroughCopy({ "./src/_data/media/**/*.webm": "media" });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addCollection("generative", function (collection) {
    return collection.getFilteredByGlob(`./src/generative/**/*.md`);
  });

  // Add plugins

  //Filters
  config.addFilter("markdown", (str) => {
    return markdownItRenderer.renderInline(str);
  });

  //Markdown options
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  config.setLibrary(
    "md",
    markdownIt(options).disable("code").use(markdownItAnchor)
  );

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
