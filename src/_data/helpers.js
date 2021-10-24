const { URL } = require("url");

module.exports = {
  /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },
  getCrumbs(pageUrl) {
    let response = ""

    return response
  },
  isFullUrl(url) {
    try {
      new URL(url);
      return true;
    } catch(e) {
      // invalid url OR local path
      return false;
    }
  },
  setGridProp(prop, values) {
    //sm, md, lg
    if (values == undefined) {
      return
    }
    let fill = new Array(3 - values.length);
    fill = values.concat(fill);
    fill.fill(values[values.length - 1], values.length);

    return [
      `--${prop}-sm: ${fill[0]};`,
      `--${prop}-md: ${fill[1]};`,
      `--${prop}-lg: ${fill[2]};`,
    ].join(' ');
  },
};
