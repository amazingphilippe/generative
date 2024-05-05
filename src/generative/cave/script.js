import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import {
  random,
  map,
} from "@georgedoescode/generative-utils";

import { roundCorners } from "svg-round-corners";

import { createNoise2D } from "simplex-noise";

// Color libraries
import { Poline, positionFunctions } from "poline";

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
  let meanderLayer = svg.group().attr("id", "meander");

  let res = random([8, 10, 20, 25]);
  let maxCols = width / res;
  let maxRows = height / res;
  // initialize the noise function
  const noise2D = createNoise2D();

  let features = {
    full: random([true, false]),
    caveShape: random(["rect", "line"]),
    thickness: random([true, false]),
    bLayerShape: random(["circle", "dot", "line", "none"]),
    bLayerSparse: easeOutQuint(random(0, 1)),
    bLayerDotDistort: easeOutQuint(random(0, 1)),
    meanderStrokeWidth: map(res, 8, 25, 1, random(1, 8, true)),
    meanderRoundness: map(random(0, 1, true), 0, 1, 0, res),
  };

  let palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  });

  // Set foreground layer B
  let bLayer = svg.group().attr("id", "bLayer");

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
      switch (features.caveShape) {
        case "rect":
          bg.attr("data-feature", "rect");
          bg.rect(
            map(cells[i].state, 0, 1, 0, 1.5 * res),
            map(cells[i].state, 0, 1, 0, 1.5 * res)
          )
            .attr({ x: col * res + res / 2, y: row * res + res / 2 })
            .fill(
              palette.colorsCSS[
              Math.floor(map(noise, -1, 1, 0, palette.colorsCSS.length - 1))
              ]
            )
            .stroke({
              width: map(noise, -1, 1, 20, res),
              linecap: "square",
              color: "none",
            })
            .attr({
              transform: `rotate(${map(noise, -1, 1, 0, 360)} ${col * res + res / 2
                } ${row * res + res / 2})`,
            });
          break;
        case "line":
          let twist = random(-1, 1);
          bg.attr("data-feature", "line");
          bg.line(
            col * res + res / 2 + twist,
            row * res - map(noise, -1, 1, 0, res),
            col * res + res / 2 - twist,
            row * res + res + map(noise, -1, 1, 0, res)
          )
            .stroke({
              width: features.thickness ? res * 0.33 * cells[i].state + 1 : 1,
              linecap: "square",
              color:
                palette.colorsCSS[
                Math.floor(map(noise, -1, 1, 0, palette.colorsCSS.length - 1))
                ],
            })
            .attr({
              transform: `rotate(${map(cells[i].state, 0, 1, 0, 90)} ${col * res + res / 2
                } ${row * res + res / 2})`,
            });
          break;

        default:
          break;
      }
    }

    // Foreground layer
    if (cells[i].state === 0 && features.bLayerSparse > random(0, 1)) {
      switch (features.bLayerShape) {
        case "dot":
          bLayer.attr("data-feature", "dot");
          if (noise > 0) {
            bLayer
              .circle(3, 3)
              .attr({ cx: col * res, cy: row * res })
              .fill(random(palette.colorsCSS))
              .css({ "mix-blend-mode": random[("overlay", "multiply")] })
              .attr({
                "vector-effect": "non-scaling-stroke",
                "transform-origin": `${col * res + res / 2} ${row * res + res / 2
                  }`,
                transform: `
          rotate(${map(noise, -1, 1, 0, 360)}) 
          translate(${noise * 20})
          
          `,
              });
          }

          break;
        case "circle":
          bLayer.attr("data-feature", "circle");

          bLayer
            .circle(map(noise, -1, 1, res, 5), map(noise, -1, 1, res, 5))
            .attr({ cx: col * res, cy: row * res })
            .fill("none")
            .stroke({ width: 1, color: random(palette.colorsCSS) })
            // .css({ "mix-blend-mode": random[("overlay", "multiply")] })
            .attr({
              "vector-effect": "non-scaling-stroke",
              "transform-origin": `${col * res + res / 2} ${row * res + res / 2
                }`,
              transform: `
          rotate(${map(noise, -1, 1, 0, 360)}) 
          translate(${noise * 20})
          scale(${map(noise, -1, 1, 1, 1)} 1)
          `,
            });

          break;

        default:
          break;
      }
    }

    // Debug cave
    debug
      .rect(res, res)
      .attr({ x: col * res, y: row * res })
      .fill(["black", "white"][cells[i].state])
      .stroke({ width: 0 });
  }

  // Meander layer
  if (features.bLayerShape === "line") {
    // Filter for alive cells.
    let alive = cells.filter((item) => item.state === 0);
    let alivePoints = alive.flatMap((c) => [
      {
        x: c.col * res,
        y: c.row * res + c.noise * 4,
      },
    ]);
    // Run meadner script on alive cells as points.
    meander(alivePoints).forEach((p) => {
      meanderLayer
        .path(roundCorners(p.pathData, features.meanderRoundness).path)
        .fill("none")
        .stroke({
          width: features.meanderStrokeWidth,
          color: random(palette.colorsCSS),
        });
    });
  }

  // Bring foreground to front
  bLayer.front();
  meanderLayer.front();

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

// https://easings.net/#easeOutQuint
function easeOutQuint(x) {
  return 1 - Math.pow(1 - x, 5);
}

// From meander sketch.
function meander(points) {
  // Takes points array, returns meandering path as pathData

  // Find the average distance to the closest point for every point.
  let averageDistance = 0;
  points.forEach((c1, i) => {
    let closest = 9999;
    points.forEach((c2, j) => {
      if (i != j) {
        let d = distance(c1, c2);
        if (d < closest) {
          closest = d;
        }
      }
    });
    averageDistance += closest;
  });
  averageDistance = (averageDistance / points.length) * 1.3;

  // Loop

  let stuck = false;
  let count = 0;
  let root = points.shift();
  let polyline = [root];
  let polylines = [];

  // While not stuck, find candidates

  while (!stuck) {
    let candidates = [];
    points.forEach((c, i) => {
      let d = distance(c, root);
      if (d < averageDistance) {
        candidates.push(c);
      }
    });

    // When there are no more candidates, create a polyline and find a new root, as long as there are still more than 2 point in the points array
    // 100 could be a parameter. Could influence precision?
    if (candidates.length == 0 || count > 2000) {
      if (points.length > 2) {
        // Find new root
        root = points.shift();
        polylines.push(new paper.Path(polyline.flatMap((c) => [[c.x, c.y]])));
        polyline = [root];
        continue;
      }

      stuck = true;
      console.log(`Stuck! After ${count} iterations`);
    }

    candidates.sort((a, b) => a.y - b.y);

    // Shift the lowest Y from candidates
    let add = candidates.shift();

    // Remove chosen candidates from remaining points
    let remove = points.findIndex((item) => item == add);
    points.splice(remove, 1);

    if (add) {
      // lines.line(root.centroid.x, root.centroid.y, add.centroid.x, add.centroid.y, ).fill("none").stroke({ color: "#423", width: 3, linecap: "round" });
      polyline.push(add);
    }

    root = add;
    //console.log(root);

    count++;
  }

  return polylines;
}

function distance(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}
