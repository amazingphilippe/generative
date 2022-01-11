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
    console.log("http://cliqu.art" + art.url, slug);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://cliqu.art" + art.url);
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
