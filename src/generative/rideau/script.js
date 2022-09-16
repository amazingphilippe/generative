import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import quickNoise from "https://cdn.skypack.dev/quick-perlin-noise-js";

import chroma from "https://cdn.skypack.dev/chroma-js";

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

const palette = ["#8C1C13", "#FFD400", "#34623F", "#2C497F"];
const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  let seed = quickNoise.create(() => random(0, 1));
  swap(
    palette,
    Math.floor(random(0, palette.length)),
    Math.floor(random(0, palette.length))
  );

  let hDensity = 100;
  for (var j = 0; j < hDensity; j++) {
    let offset = { x: 50 + (300 / hDensity) * j, y: 50 };
    for (var g = 0; g < 3; g++) {
      let points = [];
      for (var i = 0; i < 20; i++) {
        let noise = seed(i / width, g, i + i / hDensity);
        points.push([offset.x + (noise * i * j) / 10, i * 15 + 50 + g]);
      }
      svg
        .path(spline(points, 1, false))
        .stroke({
          weight: 2,
          color: chroma(palette[g]).saturate(random(-2, 2)),
        })
        .fill("none")
        .css("mix-blend-mode", "multiply")
        .attr({ "stroke-dasharray": random(200, 300) + " 900" });
    }
  }
}
generate();

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
  return a;
}
