import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js

import {
  random,
  map,
  createNoiseGrid,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

import seedrandom from "https://cdn.skypack.dev/seedrandom";

import chroma from "https://cdn.skypack.dev/chroma-js";
import quickNoise from "https://cdn.skypack.dev/quick-perlin-noise-js";

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

//const palette = ["#f2f6d0","#d0e1d4","#d9d2b6","#e4be9e"]; // 71697A 17301C
const palette = ["#819595", "#B1B6A6", "#d0e1d4", "#34623F", "#e4be9e"];
const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  const rand = fxrand();

  let seed = quickNoise.create(() => rand);

  for (var i = 1; i < 180; i++) {
    let chaos = seedrandom(rand * i)();
    let chaos2 = seedrandom(i)();

    let colorA = palette[Math.floor(map(chaos, 0, 1, 0, palette.length))];
    let colorB = palette[Math.floor(map(chaos2, 0, 1, 0, palette.length))];

    let previousPoint = false;
    let start = map(chaos, 0, 1, 0, Math.PI * 2);
    let fade = map(chaos, 0, 1, 0, start);

    let increment = map(i, 1, 180, 0.2, 0.05);

    for (let a = start; a < Math.PI * 2 + start; a += increment) {
      //let chaos3 = seedrandom(a)();
      let phase = Math.max(i, 90);
      let noise = seed(Math.cos(a) + start, Math.sin(a) + start, phase);
      let r = map(noise, -1, 1, i, Math.min(i, 90));
      let x = r * Math.cos(a) + width / 2;
      let y = r * Math.sin(a) + height / 2;

      if (previousPoint) {
        svg
          .line(previousPoint.x, previousPoint.y, x, y)
          .css("mix-blend-mode", "multiply")
          .stroke({
            color: chroma.mix(colorA, colorB, a % fade, "lab"),
            width: 1,
          });
        //.stroke({ color: colorA, width: 1});
      }

      previousPoint = { x, y };
    }
  }
}
generate();

function getNoiseValue(cell, grid) {
  return grid;
}
