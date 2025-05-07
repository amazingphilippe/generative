import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import { map, random } from "@georgedoescode/generative-utils";

// Color libraries
import { Poline, positionFunctions } from "poline";
import chroma from "chroma-js";

const svg = SVG(".canvas");

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

paper.setup(document.getElementById("shadow"));

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group();

  let tone = random(0, 360);

  //const palette = ["#2C497F"];
  let palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  // Begin awesomeness

  // Layers
  let linesLayer = svg.group().attr("id", "grid");

  // Draw one horizontal line from 0, height to width, height. The line should have X amount of segments, where X is a random integer
  let resolution = random(10, 20, true);
  let thickness = random(7, 10, true) * 2;
  let segments = Array.from({ length: resolution + 1 }, (_, i) => {
    return [map(i, 0, resolution, 10, width - 10), height - 10 - thickness / 2];
  });
  linesLayer
    .polyline(segments)
    .stroke({ color: random(palette), width: thickness })
    .fill("none")
    .css({ "mix-blend-mode": "multiply" });

  // While segments is above 0 X amount of iteration, loop through each item of the segments array and pull the y coord upwards.

  while (segments[0][1] > 50) {
    for (let i = 0; i < resolution + 1; i++) {
      segments[i][1] -= random(thickness - 5, thickness - 2, true);
    }
    linesLayer
      .polyline(segments)
      .stroke({ color: random(palette), width: thickness })
      .fill("none")
      .css({ "mix-blend-mode": "multiply" });
  }

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function distance(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}
