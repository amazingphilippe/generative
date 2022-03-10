
/*

- new page
- create svg node. template?
- load script
- capture

*/


const puppeteer = require("puppeteer");
const arts = require("./art.json");

const fs = require("fs");
const path = require("path");

(async () => {
  // Create an img directory in the output folder
  const dir = path.resolve(__dirname, "./dist/images/art");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  for (const art of arts) {
    // Get the second-to-last segment (the slug)
    const segments = art.url.split("/");
    console.log(segments);
    const slug = segments[segments.length - 2];
    console.log("https://www.cliqu.art/generative/" + art.url, slug);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.cliqu.art/generative/rideau/");
    await page.addScriptTag("./generative/" + slug + "/script.js");
    await page.waitForSelector("main svg");
    await page.setViewport({
      width: 900,
      height: 900,
      deviceScaleFactor: 2
    });
    const svg = await page.$("main svg");
    await svg.screenshot({ path: "dist/images/art/" + slug + ".png" });
    await browser.close();
  }
})();
