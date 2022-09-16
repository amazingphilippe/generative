import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import chroma from "https://cdn.skypack.dev/chroma-js";
import quickNoise from "https://cdn.skypack.dev/quick-perlin-noise-js";

const svg = SVG(".canvas");

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  generate();
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    generate();
  }
});

//const palette = ["#f2f6d0","#d0e1d4","#d9d2b6","#e4be9e"]; // 71697A 17301C
const palette = ["#B1B6A6", "#d0e1d4", "#d9d2b6", "#e4be9e"];
const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();

  let rand = random(0, 1);
  let seed = quickNoise.create(() => rand);

  let colorA = random(palette);

  for (var i = 1; i < 180; i++) {


    let previousPoint = false;
    let startPoint = false;
    let startColor = false;
    let start = map(rand, 0, 1, 0, Math.PI * 2);
    let fade = map(rand, 0, 1, 0, start);

    let increment = map(i, 0, 180, (Math.PI * 2) / 25, (Math.PI * 2) / 65);

    for (let a = start; a < Math.PI * 2 + start; a += increment) {
      let noise = seed(Math.cos(a) + start, Math.sin(a) + start, rand);

      let r = map(noise, -1, 1, i, 180);
      let x = r * Math.cos(a) + width / 2;
      let y = r * Math.sin(a) + height / 2;

      if (previousPoint) {
        svg
          .line(previousPoint.x, previousPoint.y, x, y)
          .css("mix-blend-mode", "multiply")
          .stroke({
            color: colorA,
            width: 1,
          });
        //.stroke({ color: colorA, width: 1});
      }
      if (!startPoint) {
        startPoint = {x, y};
        startColor = colorA;
      }

      previousPoint = { x, y };
    }
    svg
      .line(previousPoint.x, previousPoint.y, startPoint.x, startPoint.y)
      .css("mix-blend-mode", "multiply")
      .stroke({
        color: startColor,
        width: 1,
      });
  }
}
generate();

function getNoiseValue(cell, grid) {
  return grid;
}
