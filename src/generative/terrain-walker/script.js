import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import { random } from "@georgedoescode/generative-utils";
import concaveman from "concaveman";

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

  let palettes = [
    new Poline({
      anchorColors: [
        [tone, 0.9, 0.4],
        [tone + random(0, 15), 0.5, 0.6],
        [tone + random(0, 120), 0.5, 0.6],
      ],
      positionFunctionX: positionFunctions.sinusoidalPosition,
      numPoints: 5,
    }).colorsCSS,
    new Poline({
      anchorColors: [
        [15, 0.75, 0.5],
        [50, 1, 0.5],
        [134, 0.31, 0.29],
        [219, 0.49, 0.34],
      ],
      positionFunctionX: positionFunctions.sinusoidalPosition,
      positionFunctionY: positionFunctions.sinusoidalPosition,
      positionFunctionZ: positionFunctions.cubicPosition,
      numPoints: 3,
    }).colorsCSS,
  ];

  let palette = random(palettes);

  // Begin awesomeness

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  let gridLayer = svg.group().attr("id", "grid");
  let nodeLayer = svg.group().attr("id", "nodes");

  // Features
  let grid = 50;
  let gridY = 50;
  let size = random([0.875, 0.95]);
  let offset = { x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) };
  let variation = {
    nodeSize: ((width * size) / grid) * 0.9,
    grid: grid,
    nodeType: random(["burst", "circle", "petals", "none"]),
    beltWidth: 1,
  };

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  for (let i = 0; i < grid + 1; i++) {
    gridLayer
      .line(
        offset.x,
        offset.y + i * ((height * size) / grid),
        offset.x + width * size,
        offset.y + i * ((height * size) / grid)
      )
      .stroke({ color: "#a2a5c7", width: 0.5 });
    gridLayer
      .line(
        offset.x + i * ((width * size) / grid),
        offset.y,
        offset.x + i * ((width * size) / grid),
        offset.y + height * size
      )
      .stroke({ color: "#a2a5c7", width: 0.5 });
  }

  // Randots
  let targetDots = grid * gridY;
  let dots = [];
  let center = { x: grid / 2, y: grid / 2 };
  let walks = 0;

  while (dots.length < targetDots && walks < 50) {
    let maxAttemps = 100;
    let color = random(palette);
    for (let walk = 0; walk < 80; walk++) {
      let x, y;
      if (center.x <= 0) {
        x = center.x + random(0, 1, true);
      } else if (center.x >= grid) {
        x = center.x + random(-1, 0, true);
      } else {
        x = center.x + random(-1, 1, true);
      }

      if (center.y <= 0) {
        y = center.y + random(0, 1, true);
      } else if (center.y >= gridY) {
        y = center.y + random(-1, 0, true);
      } else {
        y = center.y + random(-1, 1, true);
      }

      let dot = {
        col: x,
        row: y,
        x: offset.x + x * ((width * size) / grid),
        y: offset.y + y * ((height * size) / grid),
        radius: variation.nodeSize / 2,
        color: chroma(color).hex(),
      };
      // If the new dot is distinct from other dots
      if (
        !dots.some((d) => {
          return d.row === dot.row && d.col === dot.col;
        })
      ) {
        dots.push({ ...dot, toCenter: distance(dot, center) });
        center = { x: x, y: y };
      } else if (maxAttemps > 0) {
        walk--;
        maxAttemps--;
      } else {
        // console.log("Got stuck, finding new start point");
        let newStart = findNewStartPoint(dots);
        if (newStart) {
          center = { x: newStart.col, y: newStart.row };
          // console.log("Found new start point");
        } else {
          center = { x: grid / 2, y: grid / 2 }; // Fallback to center if no available spots
          // console.log("No available spots, returning to center");
        }
        break;
      }
    }
    console.log(`Progress: ${dots.length}/${targetDots} dots created`);
    walks++;
  }

  // 1) ordering all the points in the point cloud based on their distance from the center of the point cloud.
  // dots.sort((a, b) => {
  //   return a.toCenter > b.toCenter;
  // });

  let uniqueDotsObject = dots.reduce((accumulator, current) => {
    let key = `${current.row}${current.col}`;

    if (!accumulator[key]) {
      accumulator[key] = current;
    }

    return accumulator;
  }, {});

  let uniqueDots = Object.values(uniqueDotsObject);

  uniqueDots.forEach((dot) => {
    // let r = variation.nodeSize;
    let color = random(palette);

    nodeLayer
      .circle(dot.radius * 2 - variation.beltWidth)
      .attr({ cx: dot.x, cy: dot.y })
      .fill(dot.color)
      .stroke({ color: dot.color, width: 0.5 });
  });

  // Helper function to check if a dot has available space around it
  function hasAvailableSpace(dot, dots) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        let newX = dot.col + dx;
        let newY = dot.row + dy;

        // Check bounds
        if (newX < 0 || newX >= grid || newY < 0 || newY >= gridY) continue;

        // If we find an empty spot, this dot has available space
        if (!dots.some((d) => d.col === newX && d.row === newY)) {
          return true;
        }
      }
    }
    return false;
  }

  // Find a random dot with available space
  function findNewStartPoint(dots) {
    let availableDots = dots.filter((dot) => hasAvailableSpace(dot, dots));
    if (availableDots.length === 0) return null;
    return availableDots[Math.floor(Math.random() * availableDots.length)];
  }

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function distance(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}
