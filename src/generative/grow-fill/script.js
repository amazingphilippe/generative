import { SVG } from "@svgdotjs/svg.js";
// plugins for svg dot js...

// So powerful
import paper from "paper";

// Some utils
import {
  random,
  map,
  spline,
  createVoronoiTessellation,
} from "@georgedoescode/generative-utils";
import { roundCorners } from "svg-round-corners";

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

  let palette = new Poline({
    anchorColors: [
      [tone, 0.5, 0.2],
      [tone + random(0, 15), 0.5, 0.6],
      [tone + random(0, 120), 0.5, 0.6],
    ],
    positionFunctionX: positionFunctions.sinusoidalPosition,
    numPoints: 5,
  }).colorsCSS;

  // Begin awesomeness

  // Layers
  let bgLayer = svg.group().attr("id", "background");
  // let networkLayer = svg.group().attr("id", "network");
  // let rhizomeLayer = svg.group().attr("id", "rhizome");
  // let dotsLayer = svg.group().attr("id", "dots");

  // Features
  let grid = random(7, 11, true);
  let size = random([0.875, 0.95]);
  let offset = { x: width * ((1 - size) / 2), y: height * ((1 - size) / 2) };
  let density = random(2, 5);
  let variation = {
    density: density,
    thickness: random(1, density),
    sketch: random(0, 3),
    regularity: random(0, 5 - density),
  };

  let bgColor = chroma
    .average(palette)
    .set("hsl.h", "-180")
    .luminance(0.8)
    .hex();
  bgLayer.rect(width, height).attr({ x: 0, y: 0 }).fill(bgColor);

  /** Voronoi
   *  1. Draw tesselation within bounding rect of any shape
   *  2. Map points to shape
   *  3. Interesected cells to shape
   *  4. Run growFill on interesected cells
   */
  const tessellation = createVoronoiTessellation({
    width: width * size,
    height: height * size,
    points: [...Array(30)].map(() => {
      return {
        x: random(offset.x, width - offset.x),
        y: random(offset.y, width - offset.y),
      };
    }),
    relaxIterations: 1,
  });
  console.log("drawing", tessellation.cells.length, "cells");

  tessellation.cells.forEach((cell) => {
    let points = cell.points.map((p) =>
      new paper.Point(p[0], p[1]).add(new paper.Point(offset.x, offset.y))
    );
    let cellShape = new paper.Path(points);

    growFill(cellShape.pathData, variation).forEach((line) => {
      svg
        .path(line.pathData)
        .fill("none")
        .stroke({ width: variation.thickness, color: random(palette) });
    });
  });

  // Must be last
  debug.front();
  wtf ? debug.show() : debug.hide();
}
generate();

function growFill(shapeData, variation) {
  let shape = new paper.Path(random(shapeData)).reorient(true, true);
  let shapeLength = shape.length;
  let shapePoints = [];
  let liveLines = [];
  let deadLines = [];

  let density = variation.density || 2;
  let regularity = variation.density || 0;
  let sketch = variation.sketch || 0.5;

  for (let i = 0; i < shapeLength; i += density + regularity) {
    let start = shape.getPointAt(i);
    let end = shape.getNormalAt(i).multiply(-5).add(start);

    let liveLine = new paper.Path.Line(start, end);
    let crossings = liveLine.getCrossings(shape);

    if (crossings.length > 0) {
      end = crossings[0].point;
      // console.log("Crosses at ", crossings[0].point);
      deadLines.push(liveLine);
    } else {
      liveLines.push(liveLine);
    }

    // console.log(start, end);
    // svg.line(start.x, start.y, end.x, end.y).stroke({ width: 1, color: color });
  }

  // console.log("alive", liveLines.length, "dead", deadLines.length);

  let loops = 0;
  while (liveLines.length > 0 && loops < 60) {
    let die = [];
    let newLines = [];
    liveLines.forEach((line, i) => {
      let shouldDie = false;
      let start = line.lastSegment.point;
      let end = line
        .getTangentAt(line.length)
        .multiply(5)
        .add(new paper.Point(random(-sketch, sketch), random(-sketch, sketch)))
        .add(start);

      let liveLine = new paper.Path.Line(start, end);

      // To find the closest crossing, we track the initial length of the segment.
      let closestCrossing = liveLine.length;

      // Get crossings with hard shape last?
      let crossings = liveLine.getCrossings(shape);

      if (crossings.length > 0) {
        closestCrossing = crossings[0].offset;
        end = crossings[0].point;
        debug.circle(3).attr({ cx: end.x, cy: end.y }).fill("cyan");
        shouldDie = true;
      }

      // Get crossings with other lines. If found, kill line.
      liveLines.forEach((otherLine, j) => {
        if (i === j) {
          return;
        }
        crossings = liveLine.getCrossings(otherLine);
        if (crossings.length > 0) {
          // If the found crossing is closer than the hard shape crossing...
          if (closestCrossing > crossings[0].offset) {
            end = crossings[0].point;
            debug.circle(3).attr({ cx: end.x, cy: end.y }).fill("red");
            shouldDie = true;
          }
        }
      });

      deadLines.forEach((otherLine, j) => {
        crossings = liveLine.getCrossings(otherLine);
        if (crossings.length > 0) {
          // If the found crossing is closer than the hard shape crossing...
          if (closestCrossing > crossings[0].offset) {
            end = crossings[0].point;
            debug.circle(3).attr({ cx: end.x, cy: end.y }).fill("black");
            shouldDie = true;
          }
        }
      });

      // Add segment to live line, now that we know where it should end.
      line.add(end);

      // Sometimes, add a new line
      if (random(0, 1) > 10 / line.segments.length && !shouldDie) {
        let end = line
          .getNormalAt(line.length)
          .multiply(5)
          .add(
            new paper.Point(random(-sketch, sketch), random(-sketch, sketch))
          )
          .add(start);
        let newLine = new paper.Path.Line(start, end);
        if (shape.contains(start) && shape.contains(end)) {
          newLines.push(newLine);
          // svg
          //   .line(
          //     newLine.lastSegment.previous.point.x,
          //     newLine.lastSegment.previous.point.y,
          //     newLine.lastSegment.point.x,
          //     newLine.lastSegment.point.y
          //   )
          //   .stroke({ width: 1, color: color });
        }
      }

      if (line.segments.length > 30) {
        shouldDie = true;
      }

      // console.log("draw line");
      // svg;
      // .line(
      //   line.lastSegment.previous.point.x,
      //   line.lastSegment.previous.point.y,
      //   line.lastSegment.point.x,
      //   line.lastSegment.point.y
      // )
      // .stroke({ width: 1, color: color });

      if (shouldDie) {
        die.push(i);
      }
    });

    // console.log(die, liveLines.length);
    die.sort((a, b) => a - b).reverse();
    die.forEach((death) => {
      deadLines.push(...liveLines.splice(death, 1));
    });
    // liveLines = liveLines.filter((line, i) => !die.includes(i));

    // console.log(die, liveLines.length);
    liveLines.push(...newLines);

    loops++;

    // console.log(
    //   liveLines.length,
    //   "lines",
    //   deadLines.length,
    //   "dead",
    //   deadLines.length + liveLines.length
    // );
  }
  console.log("loops", loops, "alive ", liveLines.length);
  return deadLines;
}
