import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

import { makeNoise2D } from "open-simplex-noise";

// Color libraries
import { Poline, positionFunctions } from "poline";
import chroma from "chroma-js";

const svg = SVG(".canvas");

// Some utils
import { random, map, spline } from "@georgedoescode/generative-utils";

let debug;
let wtf = false;

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  generate();
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyR") {
    generate();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyD") {
    wtf = !wtf;
    wtf ? debug.show() : debug.hide();
  }
});

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group();

  let paletteStart = random([20, 300]);

  let tone = random(0, 360);

  let palettes = [
    new Poline({
      anchorColors: [
        [tone, 0, 0.1],
        [tone + random(0, 15), 0.1, 0.5],
        [tone + random(0, 120), 0.1, 0.5],
      ],
      positionFunctionX: positionFunctions.sinusoidalPosition,
      numPoints: 5,
    }).colorsCSS,
    new Poline({
      anchorColors: [
        [tone, 0.0, 0.4],
        [tone + random(0, 15), 0.5, 0.6],
        [tone + random(0, 120), 0.5, 0.6],
      ],
      positionFunctionX: positionFunctions.sinusoidalPosition,
      numPoints: 5,
    }).colorsCSS,
  ];
  let palette = random(palettes);

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  let trendsLayer = svg.group().attr("id", "trends");
  let threadLayers = Array.from({ length: palette.length }, (_, i) => {
    return svg.group().attr("id", `thread-${i}`);
  });

  // Begin awesomeness
  //
  const noise2D = makeNoise2D(Date.now());

  let resolution = random(40, 100, true);
  let resolutionV = random(200, 300, true);

  let offset = 0;

  for (let i = 1; i < 100; i++) {
    let fray = random(1, 3, true);
    // fill an array of points going from 0 to width in x and noise2d in y
    let points = Array.from({ length: resolution }, (_, j) => {
      return [
        map(j, 0, resolution - 1, fray, width - fray),
        map(noise2D(i / 25, j / 35), -1, 1, -3, 3) +
          map(i, 0, 100, 5, height - 5),
      ];
    });
    // Create a path from the points
    threadLayers[Math.floor(i / 10) % palette.length]
      .polyline(points)
      .fill("none")
      .css({ "mix-blend-mode": "multiply" })
      .stroke({
        color: palette[(Math.floor(i / 10) + 5) % palette.length],
        width: 0.75,
      });
  }

  for (let i = 1; i < 8; i++) {
    let fray = random(3, 5, true);

    let pointsV = Array.from({ length: resolutionV }, (_, j) => {
      return [
        map(noise2D(i / 10, j / 40), -1, 1, -2, 2) + map(i, 0, 8, 1, width - 1),
        map(j, 0, resolutionV - 1, fray, height - fray),
      ];
    });

    // Create a path from the points
    threadLayers[Math.floor(i / 10) % palette.length]
      .polyline(pointsV)
      .fill("none")
      .css({ "mix-blend-mode": "multiply" })
      .stroke({
        color: palette[Math.floor(i / 10) % palette.length],
        width: 0.75,
      });
  }

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();
