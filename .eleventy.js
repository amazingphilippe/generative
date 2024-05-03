const Image = require("@11ty/eleventy-img");
const _ = require("lodash");

async function imageShortcode(src, cls, alt, sizes, bust) {
  let options = {
    widths: [683],
    formats: ["webp", "png"],
    outputDir: "./dist/images/generated",
    urlPath: "/images/generated/",
    cacheOptions: {
      // if a remote image URL, this is the amount of time before it fetches a fresh copy
      duration: "30d",
    },
  };

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  let url = `https://lovely-salamander-445f08.netlify.app/${src}/medium/1:1/bigger/${process.env.ELEVENTY_RUN_MODE === "build" ? bust + "/" : ""}`

  try {
    console.log(url);
    metadata = await Image(url, options);
  } catch (err) {
    console.warn(err)
    console.log(url)
    metadata = await Image(
      "src/images/not-found.svg",
      options
    );

  }
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = (config, options) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/typical/");
  config.addPassthroughCopy("./src/generative/**/script.js");
  config.addPassthroughCopy("./src/studio/**/script.js");
  config.addPassthroughCopy("./src/studio/**/style.css");
  config.addPassthroughCopy("./src/generative/**/style.css");
  config.addPassthroughCopy({ "./src/scss/**/*.css": "css" });
  config.addPassthroughCopy("./src/generative/**/*.png");
  config.addPassthroughCopy("./src/blog/**/*.{png,jpg,svg}");
  config.addPassthroughCopy("./src/**/LICENSE.txt");

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addCollection("generative", function (collection) {
    return collection.getFilteredByGlob(`./src/generative/**/*.md`);
  });

  config.addCollection("curated", (collection) => {
    return (
      _.chain(collection.getAllSorted())
        .groupBy((post) => !post.data.hide && post.data.flow)
        // .toPairs()
        .reverse()
        .value()
    );
  });

  config.addCollection("blog", function (collection) {
    return collection.getFilteredByGlob(`./src/blog/**/*.md`);
  });

  //Shortcodes
  config.addNunjucksAsyncShortcode("generated", imageShortcode);

  // Add plugins
  // config.addPlugin(pluginWebc);

  // Filters
  config.addFilter("urize", function (value) {
    return encodeURIComponent(value);
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
