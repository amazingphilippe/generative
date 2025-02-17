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
let palette, flowerLayer;

//-----------------------------------------

function generate() {
  svg.clear();
  debug = svg.group().attr("id", "debug");

  //Layers
  let bgLayer = svg.group().attr("id", "background");
  flowerLayer = svg.group().attr("id", "flower");
  let gridLayer = svg.group().attr("id", "grid");



  let features = {
    roundness: random(0.3, 1),
    density: random(10, 30, true),
  };

  palette = new Poline({
    anchorColors: [
      [random(0, 190), 0.2, 0.2],
      [random(0, 360), 0.3, 0.6],
      [random(0, 360), 0.3, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  let intersection = createHexGridLines(svg, width, height, features.density);

  intersection.forEach(i => {
    debug.circle(3).attr({ cx: i.x, cy: i.y }).fill("cyan")
  })

  for (let j = 0; j < random(12, 20); j++) {

    let walkField = intersection;
    let startWalk = random(intersection)
    let walk = [startWalk]
    for (let i = 0; i < 10; i++) {

      let stride = new paper.Path.Circle(new paper.Point(startWalk), features.density * 1.5)
      debug.path(stride.pathData).fill("none").stroke("orange");
      let next = []
      let j = 0;

      while (next.length <= 3 && j < intersection.length) {
        // console.log(intersection[j]);
        if (stride.contains(new paper.Point(intersection[j]))) {
          if (intersection[j].x !== startWalk.x || intersection[j].y !== startWalk.y) {
            if (!walk.includes(intersection[j])) {
              next.push(intersection[j])

            }
          }
        }
        j++
      }
      // console.log(next);
      next.forEach(i => {
        debug.circle(6).attr({ cx: i.x, cy: i.y }).fill("green")
      })

      let chosenStep = random(next)
      if (chosenStep) {
        walk.push(chosenStep)
        startWalk = chosenStep
      } else {
        continue;
      }

    }

    let walkSegments = walk.map(step => new paper.Point(step.x, step.y))
    console.log(walkSegments);
    let walkPath = new paper.Path(walkSegments)

    gridLayer.path(roundCorners(walkPath.pathData, 30 * features.roundness).path).fill("none").stroke(random(palette))

    flower(walkSegments[0].x, walkSegments[0].y, random(features.density, features.density * 1.5))
    let startOffset = random(0, Math.PI)
    let bud = []
    for (var a = startOffset; a < Math.PI * 2 + startOffset; a += Math.PI / 3) {
      let r = 15 * 0.16667;

      let x = r * Math.cos(a);
      let y = r * Math.sin(a);

      bud.push([x + walkSegments[walkSegments.length - 1].x, y + walkSegments[walkSegments.length - 1].y]);

    }
    svg.polygon(bud).stroke(random(palette)).fill("none")

  }
  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();


function flower(posX, posY, size) {
  let points = []
  let sizeVariation = random(size * 0.1, size * 0.3)
  // Hexagon from angles
  for (var a = random(0, Math.PI); a < (Math.PI * 2) * sizeVariation; a += Math.PI / 3) {
    let r = size - a;



    let x = r * Math.cos(a);
    let y = r * Math.sin(a);

    if (r > size * 0.16667) {
      console.log(r);

      points.push([x + posX, y + posY]);

    }
  }

  points.forEach(p => {
    let p2 = []
    let startOffset = random(0, Math.PI)
    for (var a = startOffset; a < Math.PI * 2 + startOffset; a += Math.PI / 3) {
      let r = size * 0.16667;

      let x = r * Math.cos(a);
      let y = r * Math.sin(a);

      p2.push([x + p[0], y + p[1]]);

    }
    flowerLayer.polygon(p2).stroke(random(palette)).fill("none")

  })
  flowerLayer.polyline(points).stroke(random(palette)).fill("none")
}


function createHexGridLines(svg, gridWidth, gridHeight, hexSize) {
  const verticalOffset = hexSize * Math.sqrt(3);
  const horizontalOffset = hexSize * 1.5;

  const lines = [];
  const intersections = [];

  // Horizontal lines
  for (let row = 0; row <= gridHeight / (hexSize * 1.35); row++) {
    // console.log(row, gridHeight, (hexSize * 1.35));
    const y = row * verticalOffset * 0.75;
    const startX = (row % 2) * horizontalOffset / 2;
    const endX = gridWidth * horizontalOffset + startX;

    // lines.push(`M ${startX},${y} L ${endX},${y}`);

    // Store intersection points
    for (let col = 0; col <= gridWidth / (hexSize * 1.56); col++) {
      // Skip every other point in each row
      // console.log(col % 3);
      if (col % 3 !== row % 2) {
        const x = col * horizontalOffset + startX;
        intersections.push({ x, y });
      }

    }

  }

  // Diagonal lines (60 degrees)
  for (let col = -1; col <= gridWidth; col++) {
    const startX = col * horizontalOffset;
    const endX = startX + gridHeight * horizontalOffset / 2;
    const startY = 0;
    const endY = gridHeight * verticalOffset * 0.75;

    // lines.push(`M ${startX},${startY} L ${endX},${endY}`);
  }

  // Diagonal lines (120 degrees)
  for (let col = 0; col <= gridWidth + 1; col++) {
    const startX = col * horizontalOffset;
    const endX = startX - gridHeight * horizontalOffset / 2;
    const startY = 0;
    const endY = gridHeight * verticalOffset * 0.75;

    // lines.push(`M ${startX},${startY} L ${endX},${endY}`);
  }

  // Create path element for all lines
  lines.forEach(l => {
    svg.path(l).fill("none").stroke(random(palette))
  })

  return intersections;
}