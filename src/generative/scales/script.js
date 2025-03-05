import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

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

  let palette = new Poline({
    anchorColors: [
      [4, 0.75, 0.31],
      [50, 1, 0.5],
      [134, 0.31, 0.29],
      [219, 0.49, 0.34],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    positionFunctionY: positionFunctions.sinusoidalPosition,
    positionFunctionZ: positionFunctions.cubicPosition,
    numPoints: 3,
  }).colorsCSS;

  // Begin awesomeness
  //

  // Fill an array with 50 sequential values
  let resolution = 500;
  let cols = Array.from(
    { length: resolution },
    (_, i) => i * (width / resolution)
  );

  for (let i = 0; i < cols.length - 1; i++) {
    // Rectangle 1
    let scale = random(0, 1);
    //let size = map(easeInQuad(random(0, 1)), 0, 1, 8, resolution);
    let size = 6;
    let buffer = 1.5;

    let x1 = cols.splice(random(0, cols.length - 1, true), 1)[0];
    // let x1 = random(cols);
    console.log(x1);
    let pointA = {
      x: map(x1, 0, width, size * buffer, width - size * buffer),
      y: map(scale, 0, 1, size * buffer, height / 2),
    };
    let pointB = {
      x: map(x1, 0, width, size * buffer, width - size * buffer),
      y: Math.min(
        pointA.y + map(easeInExpo(scale), 0, 1, 15, height / 2),
        height - size * buffer
      ),
    };
    svg
      .rect(size, size)
      .attr({
        x: pointA.x - size / 2,
        y: pointA.y - size,
      })
      .fill(random(palette))
      .stroke({ color: "#012", width: 1 });

    let size2 = size; //* random(0.5, 1.5);
    svg
      .rect(size2, size2)
      .attr({
        x: pointB.x - size2 / 2,
        y: pointB.y,
      })
      .fill(random(palette))
      .stroke({ color: "#012", width: 1 });

    svg
      .line(pointA.x - size / 2, pointA.y, pointB.x - size2 / 2, pointB.y)
      .stroke({ color: "#012", width: 1 });
    svg
      .line(pointA.x + size / 2, pointA.y, pointB.x + size2 / 2, pointB.y)
      .stroke({ color: "#012", width: 1 });

    debug.circle(5).center(pointA.x, pointA.y).fill("#f06");
    debug.circle(5).center(pointB.x, pointB.y).fill("#f06");
    debug.line(pointA.x, pointA.y, pointB.x, pointB.y).stroke("#f06");
  }

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function easeInQuad(x) {
  return x * x;
}

function easeInCubic(x) {
  return x * x * x;
}

function easeInExpo(x) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}
