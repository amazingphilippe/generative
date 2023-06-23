import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "https://cdn.skypack.dev/paper";

// Some utils
import {
  random,
  map,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.34";

// Color libraries
import { Poline, positionFunctions } from "https://unpkg.com/poline?module";
import chroma from "https://cdn.skypack.dev/chroma-js";

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

const { width, height } = svg.viewbox();

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group();

  let palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  });

  // Begin awesomeness

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();
