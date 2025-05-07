import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import { random, map } from "@georgedoescode/generative-utils";

import { roundCorners } from "svg-round-corners";

import { createNoise2D } from "simplex-noise";

// Color libraries
import { Poline, positionFunctions } from "poline";
import chroma from "chroma-js";

const svg = SVG(".canvas");
paper.setup(document.getElementById("shadow"));

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
  debug = svg.group().attr("id", "debug");

  //Layers
  let bg = svg.group().attr("id", "background");
  let boxesLayer = Array.from({ length: 6 }, (_, i) => {
    return svg.group().attr("id", `box-${i}`);
  });

  let res = random([20, 25, 40]);
  let maxCols = width / res;
  let maxRows = height / res;
  // initialize the noise function
  const noise2D = createNoise2D();

  let features = {
    full: random([true, false]),
    thickness: random([true, false]),
  };

  let palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  // Init cells for cave generation
  let cells = [];

  // Generate cave
  // Each cell has a column, row, state and noise value.
  for (let y = 0; y < height; y += res) {
    for (let x = 0; x < width; x += res) {
      let init = random(0, 1);
      let col = (x / width) * maxCols + 1;
      let row = (y / height) * maxRows + 1;
      let noise = noise2D(col / 20, row / 30);
      if (init > 0.57) {
        cells.push({
          state: 0,
          row: row,
          col: col,
          noise: noise,
        });
      } else {
        cells.push({
          state: 1,
          row: row,
          col: col,
          noise: noise,
        });
      }
    }
  }

  // For each cell
  for (let i = 0; i < cells.length; i++) {
    // Shortcuts
    let row = cells[i].row;
    let col = cells[i].col;
    let noise = cells[i].noise;

    // 10 generations of cells being born, surviving and dying.
    for (let j = 0; j < 10; j++) {
      let no = 1;
      let n = 1;
      let ne = 1;
      let e = 1;
      let se = 1;
      let s = 1;
      let so = 1;
      let o = 1;

      if (row > 1) {
        n = cells[i - maxCols].state;
        // console.log("n", i - maxCols, i, cells[i - maxCols]);
      }
      if (row > 1 && col < maxCols - 1) {
        ne = cells[i - maxCols + 1].state;
        // console.log("ne", i - width / res + 1, i, cells[i - width / res + 1]);
      }
      if (col < maxCols - 1) {
        e = cells[i + 1].state;
        // console.log("e", i + 1, i, cells[i + 1]);
      }
      if (row < maxRows - 1 && col < maxCols - 1) {
        se = cells[i + maxCols + 1].state;
      }
      if (row < maxRows - 1) {
        s = cells[i + maxCols].state;
        // console.log("s", i + width / res, i, cells[i + width / res]);
      }
      if (row < maxRows - 1 && col > 0) {
        so = cells[i + maxCols - 1].state;
        // console.log("so", i + width / res - 1, i, cells[i + width / res - 1]);
      }
      if (col > 1) {
        o = cells[i - 1].state;
        // console.log("o", i - 1, i, cells[i - 1]);
      }
      if (row > 1 && col > 1) {
        no = cells[i - maxCols - 1].state;
        // console.log("no", i - width / res - 1, i, cells[i - width / res - 1]);
      }

      let voisins = n + o + s + e + ne + no + se + so;

      // Born
      if (voisins > 5) {
        cells[i].state = 1;
      }

      // Survive
      if (voisins > 5 && cells[i].state === 1) {
        cells[i].state = 1;
      }

      // Die
      if (voisins < 4) {
        cells[i].state = 0;
      }
    }

    // This condition will create some sort of padding.
    if (
      Math.floor(map(noise, -1, 1, 1, 5)) < row &&
      Math.floor(map(noise, -1, 1, height / res - 5, height / res)) > row &&
      Math.floor(map(noise, -1, 1, 1, 5)) < col &&
      Math.floor(map(noise, -1, 1, width / res - 5, width / res)) > col
    ) {
      // Background layer
      bg.attr("data-feature", "rect");
      let color = random(palette);
      for (let i = 0; i < map(noise, 0, 1, 1, 30); i++) {
        random(boxesLayer)
          .rect(
            map(cells[i].state, 0, 1, 0, 0.8 * res),
            map(cells[i].state, 0, 1, 0, 0.8 * res)
          )
          .attr({ x: col * res + res / 2, y: row * res + res / 2 })
          .fill("none")
          .stroke({
            width: 1,
            linecap: "round",
            color: chroma(color).set("lch.c", random(60, 80)).hex(),
          })
          .attr({
            transform: `rotate(${random(-15, 15, true)} ${col * res + res} ${
              row * res + res
            }) skewX(${map(noise, 0, 1, -3, i)}) skewY(${map(
              noise,
              0,
              1,
              -i,
              3
            )})`,
          })
          .css({ "mix-blend-mode": "multiply" });
      }
    }
  }
  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

// https://easings.net/#easeOutQuint
function easeOutQuint(x) {
  return 1 - Math.pow(1 - x, 5);
}
