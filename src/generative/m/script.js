import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  createVoronoiTessellation,
  random,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

const svg = SVG(".canvas");

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  generate();
});
document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    generate();
  }
});

const { width, height } = svg.viewbox();
const r = Math.round(((width / 4) * height) / 4);

const palette = ["#000"];

function generate() {
  svg.clear();

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      let mWidth = width / 4;
      let mHeight = height / 4;

      //M0 0V100H20V50L30 100H50L60 50V100H80V0H60L40 75L20 0H0Z
      //M0 0V100H20V66.6667L30 100H50L60 60V100H80V0H75H60L40 66.6667L20 0H0Z
      var m = svg
        .path("M0 0V100H20V50L30 100H50L60 50V100H80V0H60L40 75L20 0H0Z")
        .fill("#000")
        .size(mWidth, mHeight)
        .move(i * mWidth, j * mHeight)
        .transform({
          rotate: random(0, 3, true) * 90,
        });

      var clip = svg.clip().add(m);

      let clipWidth = random(1, 4, true);
      let clipHeight = random(1, 4, true);
      let clipOffsetX = random(0, 4 - clipWidth, true);
      let clipOffsetY = random(0, 4 - clipHeight, true);
      var rect = svg
        .rect((clipWidth * mWidth) / 4, (clipHeight * mHeight) / 4)
        .move(
          i * mWidth + (clipOffsetX * mWidth) / 4,
          j * mHeight + (clipOffsetY * mHeight) / 4
        )
        .fill("#000");

      rect.clipWith(clip);
    }
  }
}
generate();
